import axios from "axios";
import { Queue, Worker } from "bullmq";
import { utils, writeFile } from "xlsx";
import { fromPairs, groupBy } from "lodash";
import { RootObject, TrackedEntityInstance } from "./interfaces";
import { connection } from "./redis";
import { dataElements, programStages } from "./dataElements";

const processedElements = fromPairs(
    dataElements.map(({ shortName, id }) => [id, shortName])
);
const processedStages = fromPairs(
    programStages.map(({ displayName, id }) => [id, displayName])
);

export const downloadQueue = new Queue("download", {
    connection,
});

const processTrackedEntityInstances = (
    trackedEntityInstances: TrackedEntityInstance[]
) => {
    return trackedEntityInstances.flatMap(
        ({
            enrollments,
            attributes,
            relationships,
            programOwners,
            geometry,
            ...rest
        }) =>
            enrollments.flatMap(
                ({
                    events,
                    attributes: enrollmentAttributes,
                    relationships,
                    notes,
                    ...other
                }) =>
                    events.map(
                        ({
                            dataValues,
                            notes,
                            relationships,
                            ...remaining
                        }) => ({
                            ...rest,
                            ...attributes.concat(enrollmentAttributes).reduce(
                                (acc, { displayName, value }) => ({
                                    ...acc,
                                    [displayName]: value,
                                }),
                                {}
                            ),
                            ...other,
                            ...dataValues.reduce(
                                (acc, { dataElement, value }) => ({
                                    ...acc,
                                    [processedElements[dataElement] ||
                                    dataElement]: value,
                                }),
                                {}
                            ),
                            ...remaining,
                        })
                    )
            )
    );
};

const worker = new Worker<{
    username: string;
    password: string;
    url: string;
    program: string;
    name: string;
    programStartDate: string;
    programEndDate: string;
}>(
    "download",
    async (job) => {
        const {
            programStartDate,
            programEndDate,
            username,
            password,
            url,
            name,
            program,
        } = job.data;
        const api = axios.create({
            baseURL: url,
            auth: { username: username, password: password },
        });

        let page = 1;
        let size = 1;
        let processed: any[] = [];
        let pageCount: number = 0;

        while (size > 0) {
            let params: { [key: string]: string | number | boolean } = {
                program: program,
                ouMode: "ALL",
                fields: "*",
                page,
                programStartDate,
                programEndDate,
                pageSize: 500,
            };
            console.log(`Working on page ${page} of ${pageCount}`);

            if (page === 1) {
                params = { ...params, totalPages: true };
            }
            const {
                data: { trackedEntityInstances, pager },
            } = await api.get<RootObject>("trackedEntityInstances.json", {
                params,
            });

            if (pager && pager.pageCount) {
                pageCount = pager.pageCount;
            }
            processed = processed.concat(
                processTrackedEntityInstances(trackedEntityInstances)
            );

            size = trackedEntityInstances.length;
            page = page + 1;
        }

        console.log("Finished Querying data");

        console.log(processed.length);

        const groupedData = groupBy(processed, "programStage");

        const workbook = utils.book_new();

        for (const [key, rows] of Object.entries(groupedData)) {
            const worksheet = utils.json_to_sheet(rows);
            utils.book_append_sheet(
                workbook,
                worksheet,
                `${key}${processedStages[key] || key}`
                    .slice(0, 30)
                    .replace("\\", "")
                    .replace("/", "")
                    .replace("?", "")
                    .replace("*", "")
                    .replace("[", "")
                    .replace("]", "")
            );
        }

        writeFile(
            workbook,
            `${name}-${programStartDate}-${programEndDate}.xlsx`
        );
        console.log("Done and dusted");
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});

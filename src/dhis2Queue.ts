import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import axios from "axios";
import { Queue, Worker } from "bullmq";
import { OrgUnit } from "./interfaces";
import { connection } from "./redis";
import { flattenInstances, insertData, processOrganisations } from "./utils";

export const dhis2Queue = new Queue<
    {
        username: string;
        password: string;
        url: string;
        program: string;
        page?: number;
    } & Record<string, any>
>("dhis2", {
    connection,
});

const worker = new Worker<
    {
        username: string;
        password: string;
        url: string;
        program: string;
        page?: number;
    } & Record<string, any>
>(
    "dhis2",
    async (job) => {
        let {
            page = 1,
            program,
            url,
            username,
            password,
            ...others
        } = job.data;
        let pageCount = 1;
        const api = axios.create({
            baseURL: url,
            auth: { username: username, password: password },
        });
        try {
            const {
                data: { organisationUnits },
            } = await api.get<{
                organisationUnits: Array<OrgUnit>;
            }>("organisationUnits.json", {
                params: {
                    fields: "id,path,name,parent[name,parent[name]]",
                    paging: "false",
                    level: 5,
                },
            });
            const processedUnits = processOrganisations(organisationUnits);
            do {
                let params: Record<string, any> = {
                    ...others,
                    page,
                };
                if (pageCount === 1) {
                    params = { ...params, totalPages: true };
                }
                const {
                    data: { trackedEntityInstances, ...rest },
                } = await api.get<{
                    trackedEntityInstances: Array<any>;
                    pager: { pageCount: number };
                }>("trackedEntityInstances.json", {
                    params,
                });

                if (pageCount === 1 && rest.pager && rest.pager.pageCount) {
                    pageCount = rest.pager.pageCount;
                }
                if (trackedEntityInstances.length > 0) {
                    const { instances, calculatedEvents } = flattenInstances(
                        trackedEntityInstances,
                        processedUnits
                    );
                    await insertData({ instances, calculatedEvents, program });
                }
                page = page + 1;
            } while (page <= pageCount);
        } catch (error) {
            console.log(error);
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});

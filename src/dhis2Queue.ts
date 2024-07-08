import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import axios from "axios";
import { Queue, Worker } from "bullmq";
import { OrgUnit } from "./interfaces";
import { layeringQueue } from "./layeringQueue";
import { connection } from "./redis";
import { processOrganisations, queryDHIS2Data } from "./utils";

export const dhis2Queue = new Queue<
    {
        username: string;
        password: string;
        url: string;
        program: string;
        generate: boolean;
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
        generate: boolean;
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
            generate,
            ...others
        } = job.data;
        const api = axios.create({
            baseURL: url,
            auth: { username: username, password: password },
        });
        try {
            console.log("Fetching organisation units");
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

            await queryDHIS2Data({
                program,
                page,
                processedUnits,
                api,
                others,
                callback: (data: string[]) => {
                    if (generate && data.length > 0) {
                        const query: QueryDslQueryContainer = {
                            terms: {
                                "trackedEntityInstance.keyword": data,
                            },
                        };
                        layeringQueue.add(
                            String(new Date().getMilliseconds),
                            query
                        );
                    }
                },
            });
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

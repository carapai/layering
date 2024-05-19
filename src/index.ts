import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import axios from "axios";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { z } from "zod";
import { dhis2Queue } from "./dhis2Queue";
import { downloadQueue } from "./downloadQueue";
import { generateXLS } from "./generateExcel";
import { myQueue } from "./layeringQueue";
import { client } from "./elasticsearch";

const app = new Hono();

app.use("/*", cors());
app.use(trimTrailingSlash());

app.post(
    "/",
    zValidator(
        "json",
        z.object({
            trackedEntities: z.string().array().optional(),
        })
    ),
    async (c) => {
        const options = c.req.valid("json");
        let query: QueryDslQueryContainer = {
            match_all: {},
        };
        if (options.trackedEntities) {
            query = {
                terms: {
                    "trackedEntityInstance.keyword": options.trackedEntities,
                },
            };
        }
        const job = await myQueue.add("myJobName", query);
        return c.json(job);
    }
);

app.get(
    "/download",
    zValidator(
        "query",
        z.object({
            period: z.string(),
            selectedOrgUnits: z.string(),
            code: z.string().optional(),
        })
    ),
    async (c) => {
        const options = c.req.query();
        const buffer = await generateXLS({
            selectedOrgUnits: options.selectedOrgUnits.split(","),
            period: options.period,
            code: options.code,
        });
        return c.body(buffer, 200, {
            "Content-Type": "application/vnd.ms-excel",
            "Content-Disposition": "attachment; filename=data.xlsx",
        });
    }
);

app.post(
    "/index",
    zValidator(
        "json",
        z.object({
            program: z.string(),
            page: z.number().optional(),
            url: z.string(),
            username: z.string(),
            password: z.string(),
            others: z.record(z.any()),
        })
    ),
    async (c) => {
        const { others, ...rest } = c.req.valid("json");
        const job = await dhis2Queue.add(rest.program, { ...rest, ...others });
        return c.json(job);
    }
);

app.post("/tei", async (c) => {
    const body = await c.req.json();
    const job = await downloadQueue.add("download", body);
    return c.json(job);
});
app.post("/sql", async (c) => {
    const query = await c.req.json();
    const data = await client.sql.query(query);
    return c.json(data);
});

app.post(
    "/reset",
    zValidator(
        "json",
        z.object({
            url: z.string(),
            username: z.string(),
            password: z.string(),
        })
    ),
    async (c) => {
        const { url, username, password } = c.req.valid("json");
        const api = axios.create({
            baseURL: url,
            auth: { username: username, password: password },
        });
        const {
            data: { programs },
        } = await api.get<{ programs: Array<{ id: string }> }>(
            "programs.json",
            { params: { fields: "id", paging: false } }
        );
        const {
            data: { programStages },
        } = await api.get<{ programStages: Array<{ id: string }> }>(
            "programStages.json",
            { params: { fields: "id", paging: false } }
        );

        const all = programs
            .concat(programStages)
            .map(({ id }) => String(id).toLowerCase());

        const links = all
            .concat("layering", "layering2")
            .map((a) => `curl -X PUT localhost:9200/${a}?pretty`);

        // console.log(links);

        // for (const index of [...all, "layering", "layering2"]) {
        //     console.log(`Working on ${index}`);
        //     try {
        //         await client.indices.delete({ index });
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     try {
        //         await client.indices.create({
        //             index,
        //             settings: {
        //                 "index.mapping.total_fields.limit": "10000",
        //             },
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        return c.json(links);
    }
);

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

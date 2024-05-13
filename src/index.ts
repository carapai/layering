import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { downloadQueue } from "./downloadQueue";
import { generateXLS } from "./generateExcel";
import { myQueue } from "./layeringQueue";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import { dhis2Queue } from "./dhis2Queue";

const app = new Hono();

app.use("/*", cors());

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

app.post(
    "/download",
    zValidator(
        "json",
        z.object({
            period: z.string(),
            selectedOrgUnits: z.string().array(),
            code: z.string().optional(),
        })
    ),
    async (c) => {
        const options = c.req.valid("json");
        const buffer = await generateXLS(options);
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

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

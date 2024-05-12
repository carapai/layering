import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { downloadQueue } from "./downloadQueue";
import { generateXLS } from "./generateExcel";
import { myQueue } from "./queues";

const app = new Hono();

app.use("/*", cors());

app.get("/", async (c) => {
    const job = await myQueue.add("myJobName", { foo: "bar" });
    return c.json(job);
});

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

app.post("/tei", async (c) => {
    const body = await c.req.json();
    const job = await downloadQueue.add("download", body);
    return c.json(job);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

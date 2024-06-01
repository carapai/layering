import { Client } from "@elastic/elasticsearch";
import { BulkResponse } from "@elastic/elasticsearch/lib/api/types";

export const client = new Client({ node: "http://localhost:9200" });

const processBulkInserts = (inserted: BulkResponse) => {
    const total = inserted.items.length;
    const errors = inserted.items.flatMap(({ index }) => {
        if (index?.error) return index.error?.caused_by;
        return [];
    });

    console.log(`Total:${total}`);
    console.log(`Errors:${errors.length}`);
    console.log(errors);
};

export const indexBulk = async (index: string, data: any[]) => {
    const body = data.flatMap((doc) => [
        { index: { _index: index, _id: doc["id"] } },
        doc,
    ]);
    const response = await client.bulk({
        refresh: true,
        body,
    });

    processBulkInserts(response);
    // return response;
};

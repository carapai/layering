import { Client } from "@elastic/elasticsearch";
import { BulkResponse } from "@elastic/elasticsearch/lib/api/types";
import { sum } from "lodash";

export const client = new Client({ node: "http://localhost:9200" });

const processBulkInserts = (inserted: BulkResponse) => {
    const total = inserted.items.filter((i) => i.index?.status === 200).length;

    const allErrors = inserted.items.flatMap(({ index }) => {
        if (index?.error?.caused_by) return index?.error?.caused_by;
        return [];
    });

    const errors = sum(
        inserted.items.filter(({ index }) => index?.error !== undefined)
    );
    console.log(`Total:${total}`);
    console.log(`Errors:${errors}`);
    console.log(allErrors);
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

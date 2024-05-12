import { Client } from "@elastic/elasticsearch";
import { BulkResponse } from "@elastic/elasticsearch/lib/api/types";

export const client = new Client({ node: "http://localhost:9200" });

const processBulkInserts = (inserted: BulkResponse) => {
    console.log(inserted.items.length, inserted.errors);
    // const total = inserted.items.filter(
    //     (i: any) => i.index.error === undefined
    // ).length;

    // const allErrors = inserted.flatMap(({ items }: any) =>
    //     items
    //         .filter((i: any) => i.index.error !== undefined)
    //         .map(({ index: { error } }: any) => error)
    // );

    // const errors = sum(
    //     inserted.map(
    //         ({ items }) =>
    //             items.filter((i: any) => i.index.error !== undefined).length
    //     )
    // );
    // return {
    //     totalSuccess: `Total:${total}`,
    //     totalErrors: `Errors:${errors}`,
    //     errors: allErrors,
    // };
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

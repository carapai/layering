import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import { Workbook, stream } from "exceljs";
import { COLUMNS } from "./columns";
import { client } from "./elasticsearch";
import { fromPairs } from "lodash";
export async function generateXLS({
    period,
    selectedOrgUnits,
    code,
}: {
    period: string;
    selectedOrgUnits: string[];
    code?: string;
}) {
    const options = {
        filename: "layering.xlsx",
        useStyles: true,
        useSharedStrings: true,
    };
    const workbook = new stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet("Layering");
    let must: QueryDslQueryContainer[] = [
        {
            term: {
                ["qtr.keyword"]: period,
            },
        },
        {
            term: {
                inactive: false,
            },
        },
        {
            term: {
                deleted: false,
            },
        },
        {
            bool: {
                should: [
                    {
                        terms: {
                            ["level1.keyword"]: selectedOrgUnits,
                        },
                    },
                    {
                        terms: {
                            ["level2.keyword"]: selectedOrgUnits,
                        },
                    },
                    {
                        terms: {
                            ["level3.keyword"]: selectedOrgUnits,
                        },
                    },
                    {
                        terms: {
                            ["level4.keyword"]: selectedOrgUnits,
                        },
                    },
                    {
                        terms: {
                            ["level5.keyword"]: selectedOrgUnits,
                        },
                    },
                ],
            },
        },
    ];
    if (code) {
        must = [
            ...must,
            {
                match: {
                    ["HLKc2AKR9jW.keyword"]: code,
                },
            },
        ];
    }

    worksheet.columns = COLUMNS.map(({ display, id }) => ({
        header: display,
        key: id,
    }));
    const scrollSearch = client.helpers.scrollSearch<any, any>({
        index: "layering",
        query: {
            bool: {
                must,
            },
        },
        size: 1000,
    });
    let page = 0;
    for await (const result of scrollSearch) {
        console.log(`Adding page ${page++}`);
        for (const a of result.documents) {
            worksheet
                .addRow(fromPairs(COLUMNS.map(({ id }) => [id, a[id] || ""])))
                .commit();
        }
    }
    await workbook.commit();
}

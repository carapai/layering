import { Workbook, Worksheet } from "exceljs";
import { COLUMNS } from "./columns";
import { client } from "./elasticsearch";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
export async function generateXLS({
    period,
    selectedOrgUnits,
    code,
}: {
    period: string;
    selectedOrgUnits: string[];
    code?: string;
}) {
    const workbook = new Workbook();
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
    worksheet.addRow(COLUMNS.map(({ name }) => name));
    const scrollSearch = client.helpers.scrollSearch({
        index: "layering".toLowerCase(),
        query: {
            bool: {
                must,
            },
        },
        size: 1000,
    });
    for await (const result of scrollSearch) {
        worksheet.addRows(
            result.documents.map((a: any) =>
                COLUMNS.map(({ id }) => a[id] || " EST")
            )
        );
    }
    const buffer = workbook.xlsx.writeBuffer();
    return buffer;
}

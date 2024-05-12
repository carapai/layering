import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import { every, groupBy, has, maxBy, minBy, orderBy, uniq } from "lodash";
import {
    QueryDslQueryContainer,
    SearchRequest,
} from "@elastic/elasticsearch/lib/api/types";
import { client } from "./elasticsearch";

import homeVisitSections from "./homeVisitSections.json";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export const eventsBeforePeriod = (events: any[], end: Dayjs) => {
    return events.filter((e) => {
        return dayjs(e.eventDate).isSameOrBefore(end);
    });
};

export const eventsWithinPeriod = (events: any[], start: Dayjs, end: Dayjs) => {
    return events.filter((e) => {
        return dayjs(e.eventDate).isBetween(start, end);
    });
};

export const mostCurrentEvent = (events: any[]) => {
    return maxBy(events, "eventDate");
};

export const getCurrentViralLoad = (viralLoads: any[], endDate: Dayjs) => {
    const virals = eventsBeforePeriod(viralLoads, endDate).filter(
        ({ Ti0huZXbAM0 }) => !!Ti0huZXbAM0
    );
    let currentViralLoad = maxBy(
        virals,
        ({ Ti0huZXbAM0, eventDate }) => `${Ti0huZXbAM0}${eventDate}`
    );

    if (!currentViralLoad && virals.length > 0) {
        currentViralLoad = maxBy(virals, ({ eventDate }) => eventDate);
    }
    return currentViralLoad;
};

export const currentEvent = (events: any[], endDate: Dayjs) => {
    const eventsBeforeEndDate = eventsBeforePeriod(events, endDate);
    return maxBy(eventsBeforeEndDate, "eventDate");
};

export const firstEvent = (events: any[], endDate: Dayjs) => {
    const eventsBeforeEndDate = eventsBeforePeriod(events, endDate);
    return minBy(eventsBeforeEndDate, "eventDate");
};
export const scroll = async (
    index: string,
    trackedEntityInstances: string[],
    columns?: string[]
) => {
    let query: SearchRequest = {
        index: index.toLowerCase(),
        query: {
            bool: {
                must: [
                    {
                        terms: {
                            "trackedEntityInstance.keyword":
                                trackedEntityInstances,
                        },
                    },
                    {
                        match: {
                            deleted: false,
                        },
                    },
                ],
            },
        },
        size: 1000,
    };

    if (columns) {
        query = { ...query, _source: columns };
    }
    const scrollSearch = client.helpers.scrollSearch(query);
    let documents: any[] = [];
    for await (const result of scrollSearch) {
        documents = documents.concat(result.documents);
    }
    return groupBy(documents, "trackedEntityInstance");
};

export const scroll2 = async (index: string) => {
    let query: SearchRequest = {
        index: index.toLowerCase(),
        query: {
            match_all: {},
        },
        size: 1000,
    };
    const scrollSearch = client.helpers.scrollSearch(query);
    let documents: any[] = [];
    for await (const result of scrollSearch) {
        documents = documents.concat(result.documents);
    }
    return documents;
};

export const scroll3 = async (
    index: string,
    search: QueryDslQueryContainer,
    callback: (doc: any[]) => Promise<void>
) => {
    let query: SearchRequest = {
        index: index.toLowerCase(),
        query: search,
        size: 1000,
    };
    const scrollSearch = client.helpers.scrollSearch(query);
    for await (const result of scrollSearch) {
        await callback(result.documents);
    }

    console.log("Done");
};

export const getEconomicStatus = (hvat: any) => {
    if (hvat) {
        const { zbAGBW6PsGd, kQCB9F39zWO, iRJUDyUBLQF } = hvat;

        const score18 = [zbAGBW6PsGd, kQCB9F39zWO, iRJUDyUBLQF].filter(
            (v) => v !== null && v !== undefined && v !== ""
        );
        const yeses = score18.filter((v) => v === "Yes").length;
        const noses = score18.filter((v) => v === "No").length;
        if (score18.length === 3) {
            if (noses === 3) {
                return "Destitute";
            }
            if (yeses === 3) {
                return "Ready to Grow";
            }
            if (noses >= 1) {
                return "Struggling";
            }
        }
    }
    return "";
};

export const latestEvent = (events: any[]) => {
    return maxBy(events, "eventDate");
};
export const baselineEvent = (events: any[]) => {
    return minBy(events, "eventDate");
};

export const getAttribute = (
    attribute: string,
    event?: { [key: string]: any }
) => {
    if (event) {
        return event[attribute] || "";
    }
    return "";
};

export const anyEventWithDE = (events: any[], dataElement: string) => {
    if (events.length === 0) {
        return false;
    }
    return (
        events.find((event) => {
            return has(event, dataElement) && event[dataElement];
        }) !== undefined
    );
};

export const findAnyEventValue = (events: any[], dataElement: string) => {
    const event = orderBy(events, ["eventDate"], ["desc"]).find(
        ({ [dataElement]: de }) => de !== null && de !== undefined
    );
    if (event) {
        return event[dataElement];
    }
    return "";
};

export const getAttributes = (
    attributes: string[],
    event?: { [key: string]: any }
) => {
    return attributes.map((a) => getAttribute(a, event));
};
export const getMultiAttributes = (attributes: string[], events: any[]) => {
    return attributes.map((a) => findAnyEventValue(events, a));
};

export const getHEIInformation = (heiData: any[]) => {
    const attributes: string[] = [
        "sDMDb4InL5F",
        "aBc9Lr1z25H",
        "Qyp4adG3KJL",
        "yTSlwP6htQh",
        "fUY7DEjsZin",
        "TJPxuJHRA3P",
        "TX2qmTSj0rM",
        "r0zBP8h3UEl",
        "G0YhL0M4YjJ",
        "CWqTgshbDbW",
        "qitG6coAg3q",
        "lznDPbUscke",
        "fcAZR5zt9i3",
    ];

    const [
        eidEnrollmentDate,
        motherArtNo,
        eidNo,
        dateFirstPCRDone,
        firstPCRResults,
        dateSecondPCRDone,
        secondPCRResults,
        dateThirdPCRDone,
        thirdPCRResults,
        hivTestDueDate,
        dateHivTestDone,
        hivTestResults,
        finalOutcome,
    ] = getMultiAttributes(attributes, heiData);

    let pcr = "";

    if (hivTestResults) {
        pcr = "4";
    } else if (thirdPCRResults) {
        pcr = "3";
    } else if (secondPCRResults) {
        pcr = "2";
    } else if (firstPCRResults) {
        pcr = "1";
    }
    return {
        eidEnrollmentDate,
        motherArtNo,
        eidNo,
        dateFirstPCRDone,
        firstPCRResults:
            firstPCRResults === "1" ? "+" : firstPCRResults === "2" ? "-" : "",
        dateSecondPCRDone,
        secondPCRResults:
            secondPCRResults === "1"
                ? "+"
                : secondPCRResults === "2"
                ? "-"
                : "",
        dateThirdPCRDone,
        thirdPCRResults:
            thirdPCRResults === "1" ? "+" : thirdPCRResults === "2" ? "-" : "",
        hivTestDueDate,
        dateHivTestDone,
        hivTestResults:
            hivTestResults === "1" ? "+" : hivTestResults === "2" ? "-" : "",
        finalOutcome,
        pcr,
    };
};

export const getHIVStatus = ({
    HzUL8LTDPga,
    hivResult,
    hivTestResults,
    viralLoadsBe4Quarter,
    riskFactor,
}: Partial<{
    HzUL8LTDPga: string;
    hivResult: string;
    hivTestResults: string;
    viralLoadsBe4Quarter: any[];
    riskFactor: string;
}>) => {
    if (viralLoadsBe4Quarter && viralLoadsBe4Quarter.length > 0) {
        return "+";
    } else if (hivResult) {
        return hivResult === "Positive"
            ? "+"
            : hivResult === "Negative"
            ? "-"
            : "";
    } else if (hivTestResults) {
        return hivTestResults;
    } else if (riskFactor === "HEI") {
        return "DK";
    } else {
        if (HzUL8LTDPga === "Positive") {
            return "+";
        }
        if (HzUL8LTDPga === "Negative") {
            return "-";
        }
        if (HzUL8LTDPga === "Dont Know (DK)") {
            return "DK";
        }
        return "";
    }
};

export const getDataElement = (
    dataElement: string,
    event?: { [key: string]: any }
) => {
    if (event) return event[dataElement];

    return undefined;
};

export const calculateQuarter = (year: number, quarter: number) => {
    if (quarter === 1) {
        return [
            dayjs(new Date(`${year - 1}-10-01`)),
            dayjs(new Date(`${year}-03-31`)),
        ];
    }
    if (quarter === 2) {
        return [
            dayjs(new Date(`${year - 1}-10-01`)),
            dayjs(new Date(`${year}-06-30`)),
        ];
    }
    if (quarter === 3) {
        return [
            dayjs(new Date(`${year - 1}-10-01`)),
            dayjs(new Date(`${year}-09-30`)),
        ];
    }
    if (quarter === 4) {
        return [
            dayjs(new Date(`${year}-10-01`)),
            dayjs(new Date(`${year}-12-31`)),
        ];
    }
    return [dayjs(new Date(`${year}-10-01`)), dayjs(new Date(`${year}-12-31`))];
};

export const allEventsHaveSameValue = (
    events: any[],
    dataElement: string,
    value: any
) => {
    if (events.length > 0) {
        return events.every((e) => e[dataElement] === value);
    }
    return true;
};

export const hasDataElementWithinPeriod = (
    events: any[],
    dataElement: string,
    value: any
) => {
    return events.find((e) => e[dataElement] === value) !== undefined;
};

export const getNewlyPositive = ({
    newlyEnrolled,
    hivStatus,
    HzUL8LTDPga,
    previousViralLoads,
    previousReferrals,
}: {
    newlyEnrolled: boolean;
    hivStatus: string;
    HzUL8LTDPga: string;
    previousViralLoads: any[];
    previousReferrals: any[];
}) => {
    if (newlyEnrolled && hivStatus === "+") {
        return 1;
    }
    if (hivStatus === "+") {
        if (
            HzUL8LTDPga === "Negative" &&
            previousViralLoads.length === 0 &&
            allEventsHaveSameValue(previousReferrals, "XTdRWh5MqPw", "Negative")
        ) {
            return 1;
        } else {
            return 0;
        }
    }
    return 0;
};

export const getNewlyTestedPositive = ({
    newlyPositive,
    artStartDate,
    financialQuarterStart,
    financialQuarterEnd,
    referralsDuringYear,
    hivStatus,
}: {
    newlyPositive: number;
    artStartDate: string;
    financialQuarterStart: dayjs.Dayjs;
    financialQuarterEnd: dayjs.Dayjs;
    referralsDuringYear: any[];
    hivStatus: string;
}) => {
    let newlyTestedPositive = 0;
    if (
        newlyPositive === 1 &&
        artStartDate &&
        dayjs(artStartDate).isBetween(
            financialQuarterStart,
            financialQuarterEnd
        )
    ) {
        newlyTestedPositive = 0;
    } else if (
        newlyPositive &&
        hasDataElementWithinPeriod(
            referralsDuringYear,
            "XTdRWh5MqPw",
            "Positive"
        )
    ) {
        newlyTestedPositive = 1;
    } else if (hivStatus === "+") {
        newlyTestedPositive = 0;
    }
    return newlyTestedPositive;
};

export const getNewlyTestedAndOnArt = ({
    newlyTestedPositive,
    artStartDate,
    onArt,
    serviceProvided,
    financialQuarterStart,
    financialQuarterEnd,
}: {
    newlyTestedPositive: number;
    onArt: string;
    artStartDate: string;
    serviceProvided: string;
    financialQuarterStart: dayjs.Dayjs;
    financialQuarterEnd: dayjs.Dayjs;
}) => {
    let newlyTestedAndOnArt = 0;
    if (
        newlyTestedPositive === 1 &&
        artStartDate &&
        onArt &&
        dayjs(artStartDate).isBetween(
            financialQuarterStart,
            financialQuarterEnd
        )
    ) {
        newlyTestedAndOnArt = 1;
    } else if (serviceProvided === "Started HIV treatment") {
        newlyTestedAndOnArt = 1;
    }
    return newlyTestedAndOnArt;
};

export const anyEventHasDataElementValue = (
    events: any[],
    dataElement: string,
    value: any
) => {
    return events.find((e) => e[dataElement] === value);
};

export const newlyTestedPositive = ({
    artStartDate,
    startDate,
    endDate,
    newlyPositive,
    referralsDuringYear,
}: {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    referralsDuringYear: any[];
    artStartDate?: string;
    newlyPositive?: number;
}) => {
    if (
        newlyPositive === 1 &&
        artStartDate &&
        dayjs(artStartDate).isBetween(startDate, endDate)
    ) {
        return 1;
    }
    if (
        newlyPositive &&
        anyEventHasDataElementValue(
            referralsDuringYear,
            "XTdRWh5MqPw",
            "Positive"
        )
    ) {
        return 1;
    }
    return 0;
};

export const checkRiskAssessment = (
    dataElements: string[],
    event?: { [key: string]: any },
    value?: string
) => {
    if (event) {
        const de = dataElements
            .map((de) => event[de])
            .filter((v) => v !== undefined);
        if (de.length === 0) {
            return 0;
        }
        if (de.length < dataElements.length) {
            if (value && every(de, (v) => v === value)) {
                return 3;
            } else if (value && de.indexOf(value) !== -1) {
                return 2;
            }
            return 1;
        }
        if (de.length === dataElements.length) {
            if (value && every(de, (v) => v === value)) {
                return 6;
            } else if (value && de.indexOf(value) !== -1) {
                return 5;
            }
            return 4;
        }
    }
    return -1;
};

export const getRiskAssessment = (currentRiskAssessment?: {
    [key: string]: any;
}) => {
    const tbScreeningChild = checkRiskAssessment(
        ["DgCXKSDPTWn", "Rs5qrKay7Gq", "QEm2B8LZtzd", "X9n17I5Ibdf"],
        currentRiskAssessment
    );
    const tbScreeningChild17 = checkRiskAssessment(
        [
            "DgCXKSDPTWn",
            "Rs5qrKay7Gq",
            "QEm2B8LZtzd",
            "X9n17I5Ibdf",
            "Oi6CUuucUCP",
        ],
        currentRiskAssessment
    );
    const tbScreeningAdult = checkRiskAssessment(
        ["If8hDeux5XE", "ha2nnIeFgbu", "NMtrXN3NBqY", "Oi6CUuucUCP"],
        currentRiskAssessment
    );

    const atTBRiskChild = checkRiskAssessment(
        ["DgCXKSDPTWn", "Rs5qrKay7Gq", "QEm2B8LZtzd", "X9n17I5Ibdf"],
        currentRiskAssessment,
        "true"
    );
    const atTBRiskChild17 = checkRiskAssessment(
        [
            "DgCXKSDPTWn",
            "Rs5qrKay7Gq",
            "QEm2B8LZtzd",
            "X9n17I5Ibdf",
            "Oi6CUuucUCP",
        ],
        currentRiskAssessment,

        "true"
    );
    const atTBRiskAdult = checkRiskAssessment(
        ["If8hDeux5XE", "ha2nnIeFgbu", "NMtrXN3NBqY", "Oi6CUuucUCP"],
        currentRiskAssessment,

        "true"
    );

    const notAtRisk = checkRiskAssessment(
        [
            "WlTMjkcP6gv",
            "Y8kX45XGXXI",
            "NN0M618qUFX",
            "MH5BGP1Ww2Q",
            "p3FSiLQ1q6T",
            "x1bL4w5EsPL",
            "dunvFwnbGQF",
            "oI9btGSwA7P",
        ],
        currentRiskAssessment,
        "false"
    );

    const notAtRiskAdult = checkRiskAssessment(
        [
            "WwMOTHl2cOz",
            "uf6tkJtuWpt",
            "zpvSpZxMYIV",
            "O6O0ADYLwua",
            "VOCmw7bULXR",
            "FHu4YfcrIQw",
            "Dny6B3ubQEa",
            "h7JCV3YLRJO",
            "VtnameiqmRy",
        ],
        currentRiskAssessment,
        "false"
    );

    return {
        notAtRisk,
        notAtRiskAdult,
        tbScreeningChild,
        tbScreeningChild17,
        tbScreeningAdult,
        atTBRiskChild,
        atTBRiskChild17,
        atTBRiskAdult,
    };
};

export const deHasAnyValue = (de: string, values: any[]) => {
    if (de && values.indexOf(de) !== -1) {
        return 1;
    }
    return 0;
};

export const findStatus = (
    homeVisitsBe4Quarter: any[],
    hasEnrollment: boolean
) => {
    let memberStatus = "No Home Visit";
    let householdStatus = "Not Enrolled";
    if (findAnyEventValue(homeVisitsBe4Quarter, "tM67MBdox3O") === "true") {
        memberStatus = "Active";
    } else if (findAnyEventValue(homeVisitsBe4Quarter, "VEw6HHnx8mR")) {
        memberStatus = findAnyEventValue(homeVisitsBe4Quarter, "VEw6HHnx8mR");
    }

    if (findAnyEventValue(homeVisitsBe4Quarter, "PpUByWk3p8N")) {
        householdStatus = findAnyEventValue(
            homeVisitsBe4Quarter,
            "PpUByWk3p8N"
        );
    } else if (hasEnrollment) {
        householdStatus = "Active";
    }

    return { memberStatus, householdStatus };
};

export const isAtSchool = (
    age: number,
    homeVisitValue: any,
    enrollmentValue: any
) => {
    if (age >= 6 && age <= 17) {
        if (homeVisitValue) {
            return homeVisitValue;
        }

        if (enrollmentValue === "Yes") {
            return "No";
        }
        if (enrollmentValue === "No") {
            return "Yes";
        }
    } else if (enrollmentValue) {
        if (enrollmentValue === "Yes") {
            return "No";
        }
        if (enrollmentValue === "No") {
            return "Yes";
        }
    }
    return "NA";
};

export const hivInformation = ({
    artStartDate,
    quarterEnd,
    hivStatus,
    lastViralLoadDate,
    viralLoadResultsReceived,
    viralLoadCopies,
    viralLoadStatus,
    viralTestDone,
}: {
    artStartDate: string;
    hivStatus: string;
    quarterEnd: dayjs.Dayjs;
    lastViralLoadDate: string;
    viralTestDone: string;
    viralLoadResultsReceived: string;
    viralLoadCopies: string;
    viralLoadStatus: string;
}) => {
    let copies: string | undefined = "";
    let ovcEligible;
    let VLTestDone: number | string;
    let VLStatus;
    let ovcVL;
    let VLSuppressed;
    if (hivStatus === "+") {
        if (artStartDate) {
            const daysOnArt = quarterEnd.diff(dayjs(artStartDate), "days");
            if (daysOnArt >= 6) {
                ovcEligible = 1;
            } else if (lastViralLoadDate) {
                ovcEligible = 1;
            } else {
                ovcEligible = "NE";
            }
        } else if (lastViralLoadDate) {
            ovcEligible = 1;
        } else {
            ovcEligible = "No VL";
        }

        if (lastViralLoadDate && ovcEligible === 1) {
            const monthsSinceLastViralLoad = quarterEnd.diff(
                dayjs(artStartDate)!,
                "months"
            );
            if (monthsSinceLastViralLoad < 12) {
                VLTestDone =
                    viralTestDone === "true"
                        ? 1
                        : viralTestDone === "false"
                        ? 0
                        : 0;
                VLStatus = viralLoadStatus;
            } else {
                VLTestDone = 0;
            }
        } else {
            VLTestDone = 0;
        }
        if (viralLoadResultsReceived && VLTestDone === 1) {
            ovcVL = viralLoadResultsReceived === "true" ? 1 : 0;
            copies = viralLoadCopies;
        } else {
            ovcVL = 0;
        }
        if (ovcVL === 1) {
            VLSuppressed = viralLoadStatus === "Suppressed" ? 1 : 0;
        } else {
            ovcVL = 0;
            VLSuppressed = 0;
        }
    } else {
        VLTestDone = "";
        ovcEligible = "";
        ovcVL = "";
        VLStatus = "";
    }

    return {
        VLTestDone,
        ovcEligible,
        ovcVL,
        VLStatus,
        VLSuppressed,
        viralLoadCopies,
        copies,
    };
};

export const anyEventWithAnyOfTheValue = (
    events: any[],
    dataElement: string,
    values: string[]
) => {
    const search = events.find((event) => {
        return values.indexOf(event[dataElement]) !== -1;
    });

    if (search) return 1;
    return 0;
};

export const eventsHasDataElements = (
    events: any[],
    dataElements: string[]
) => {
    const cond = dataElements
        .map((element) => anyEventWithDE(events, element))
        .some((a) => a === true);

    if (cond) return 1;
    return 0;
};

export const anyEventWithDataElement = (
    events: any[],
    dataElement: string,
    value: any
) => {
    if (events.length === 0) {
        return undefined;
    }
    return events.find((event) => {
        return event[dataElement] === value;
    });
};

export const specificDataElement = (
    dataElement: string,
    event?: { [key: string]: any }
) => {
    return event ? event[dataElement] : null;
};

export const getIsNotAtRisk = (
    hivStatus: string,
    notAtRiskAdult: number,
    notAtRisk: number
) => {
    let isNotAtRisk = 0;
    if (hivStatus !== "+") {
        if (
            [0, 3, 6].indexOf(notAtRiskAdult) !== -1 ||
            [0, 3, 6].indexOf(notAtRisk) !== -1
        ) {
            isNotAtRisk = 1;
        } else {
            isNotAtRisk = 0;
        }
    }

    return isNotAtRisk;
};

export const getUnknownStatus = ({
    hivStatus,
    riskFactor,
    isNotAtRisk,
    age,
    unknownOther,
}: {
    hivStatus: string;
    notAtRisk: number;
    riskFactor: string;
    isNotAtRisk: number;
    age: number;
    unknownOther: any;
}) => {
    let unknown = "";
    if (hivStatus !== "+" && hivStatus !== "-" && isNotAtRisk !== 1) {
        if (riskFactor === "HEI" && hivStatus === "DK" && age <= 2) {
            unknown = "HEI";
        } else if (unknownOther) {
            unknown = unknownOther;
        } else {
            unknown = "Other reasons";
        }
    }
};

export const monthsSinceViralTest = (
    comparisonDate: dayjs.Dayjs,
    numberOfMonths: number,
    viralLoadDate?: string
) => {
    if (
        viralLoadDate &&
        comparisonDate.diff(dayjs(viralLoadDate), "months") <= numberOfMonths
    )
        return 1;

    return 0;
};

export const everMissed = (
    events: any[],
    dataElement: string,
    end: dayjs.Dayjs
) => {
    return (
        events.filter((event) => {
            return (
                has(event, dataElement) &&
                has(event, "vnxQFpwvu67") &&
                event[dataElement] &&
                dayjs(event[dataElement]).isBefore(end) &&
                [
                    "CLHIV Identified but not yet returned to Care",
                    "Beneficiary Still Missing",
                    "Rescheduled appointment",
                ].indexOf(event["vnxQFpwvu67"]) !== -1
            );
        }).length > 0
    );
};

export const searchEventBe4DateDataElement = (
    events: any[],
    dataElement: string,
    end: dayjs.Dayjs
) => {
    const filteredEvents = events.filter((event) => {
        return (
            has(event, dataElement) &&
            event[dataElement] &&
            dayjs(event[dataElement]).isBefore(end)
        );
    });

    return maxBy(
        filteredEvents,
        ({ [dataElement]: val, eventDate }) => `${val}${eventDate}`
    );
};

export const missedAppointmentInfo = (
    missedAppointments: any[],
    quarterEnd: dayjs.Dayjs
) => {
    let missedAppointmentDate = "";
    let missedAnAppointment = 0;
    let missedAnAppointmentReason = "";
    let missedAnAppointmentFollowupOutcome = "";
    let missedAnAppointmentAction = "";
    const latestMissedAppointment = searchEventBe4DateDataElement(
        missedAppointments,
        "XTl5dE2AcVM",
        quarterEnd
    );

    const hasEverMissedAnAppointment = everMissed(
        missedAppointments,
        "XTl5dE2AcVM",
        quarterEnd
    )
        ? 1
        : 0;
    if (
        latestMissedAppointment &&
        [
            "CLHIV Identified but not yet returned to Care",
            "Beneficiary Still Missing",
            "Rescheduled appointment",
        ].indexOf(latestMissedAppointment["vnxQFpwvu67"]) !== -1
    ) {
        missedAppointmentDate = latestMissedAppointment["XTl5dE2AcVM"] || "";
        missedAnAppointment = 1;
        missedAnAppointmentReason =
            latestMissedAppointment["UZWtGlGfNFq"] || "";
        missedAnAppointmentFollowupOutcome =
            latestMissedAppointment["vnxQFpwvu67"] || "";
        missedAnAppointmentAction =
            latestMissedAppointment["WiWI9KrxXLl"] || "";
    } else if (latestMissedAppointment) {
        missedAnAppointmentReason =
            latestMissedAppointment["UZWtGlGfNFq"] || "";
        missedAnAppointmentFollowupOutcome =
            latestMissedAppointment["vnxQFpwvu67"] || "";

        missedAnAppointmentAction =
            latestMissedAppointment["WiWI9KrxXLl"] || "";
    }

    return {
        missedAppointmentDate,
        missedAnAppointment,
        missedAnAppointmentReason,
        missedAnAppointmentFollowupOutcome,
        hasEverMissedAnAppointment,
        missedAnAppointmentAction,
    };
};

export const fetchGroupActivities4Instances = async (
    trackedEntityInstances: any[]
) => {
    const allMemberCodes = uniq(
        trackedEntityInstances.flatMap(({ HLKc2AKR9jW }) => {
            if (HLKc2AKR9jW) return HLKc2AKR9jW;
            return [];
        })
    );
    if (allMemberCodes.length > 0) {
        let data: any[] = [];
        await scroll3(
            "VzkQBBglj3O",
            {
                terms: {
                    ["ypDUCAS6juy.keyword"]: allMemberCodes,
                },
            },
            async (response) => {
                data = data.concat(response);
            }
        );
        return groupBy(data, "ypDUCAS6juy");
    }

    return {};
};

export const anyService = (values: number[]) => {
    const hasAny = values.some((a) => a === 1);

    if (hasAny) return 1;
    return 0;
};

export const getSectionDataElements = (sectionId: string) => {
    const section = homeVisitSections.find((a) => a.id === sectionId);
    if (section) return section.dataElements.map((a) => a.id);
    return [];
};

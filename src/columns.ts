export const COLUMNS: Array<{
    id: string;
    display: string;
    selected: boolean;
}> = [
    { selected: true, display: "Beneficiary ID", id: "beneficiaryId" },
    { selected: true, display: "HouseHold Code", id: "householdCode" },
    { selected: true, display: "Enrollment Date", id: "enrollmentDate" },
    { selected: true, display: "Type(Comprehensive, Prevention)", id: "type" },
    { selected: true, display: "District/City", id: "district" },
    { selected: true, display: "Subcounty", id: "subCounty" },
    { selected: true, display: "Parish", id: "parish" },
    { selected: true, display: "Village", id: "village" },
    { selected: true, display: "Household Head", id: "householdHead" },
    { selected: true, display: "Primary Caregiver", id: "primaryCareGiver" },
    { selected: true, display: "Date of Assessment", id: "eventDate" },
    {
        selected: true,
        display: "Current Home Visit Date",
        id: "currentHomeVisitDate",
    },
    { selected: true, display: "Beneficiary Name", id: "beneficiaryName" },
    { selected: true, display: "DOB", id: "dob" },
    { selected: true, display: "Age", id: "age" },
    { selected: true, display: "Age Group", id: "ageGroup" },
    { selected: true, display: "Sex", id: "sex" },
    { selected: true, display: "Reason for visit", id: "reasonForVisit" },
    { selected: true, display: "Current Weight", id: "weight" },
    {
        selected: true,
        display: "Risk Factor at enrolment",
        id: "baselineRiskFactor",
    },
    { selected: true, display: "Current Risk Factor", id: "riskFactor" },
    { selected: true, display: "Other Risk Factors", id: "otherRiskFactor" },
    {
        selected: true,
        display: "Baseline Household Economic Status ",
        id: "economicBaseline",
    },
    {
        selected: true,
        display: "Current Household Economic Status ",
        id: "economicStatus",
    },
    { selected: true, display: "Household status", id: "householdStatus" },
    {
        selected: true,
        display: "Household Reason for Exit",
        id: "householdExitReason",
    },
    { selected: true, display: "Member status", id: "memberStatus" },
    { selected: true, display: "Member Reasons for Exit", id: "reasonForExit" },
    {
        selected: true,
        display: "District Relocated to",
        id: "districtOfRelocation",
    },
    {
        selected: true,
        display: "Sub County Relocated to",
        id: "subCountyOfRelocation",
    },
    {
        selected: true,
        display: "Currently Enrolled in School (Y/N) (Home visit)",
        id: "enrolledInSchool",
    },
    { selected: true, display: "Newly enrolled", id: "newlyEnrolledText" },
    { selected: true, display: "HIV_Status(+, /,?,  //+)", id: "hivStatus" },
    { selected: true, display: "OVC_TST ASSESS", id: "OVC_TST_ASSESS" },
    // TODO get guidance from Julius
    // Look for HIV Risk screening question and if any of the questions has a yes from HIV/TB Risk assessment for both TB and HIV
    { selected: true, display: "OVC_TST RISK", id: "isAtRisk" },
    { selected: true, display: "OVC_TST REFER", id: "OVC_TST_REFER" },
    { selected: true, display: "OVC_TST REPORT", id: "OVC_TST_REPORT" },
    // TODO if status is DK and not at risk

    // Look for HIV Risk screening question and all are no  the questions has a yes from HIV/TB Risk HIV
    {
        selected: true,
        display: "HIV test not required based on  HIV risk Assessment",
        id: "testNotRequired",
    },
    {
        selected: true,
        display: "Unknown HIV status: other reasons",
        id: "unknown",
    },
    {
        selected: true,
        display: "Newly Reported HIV Positive (1 Yes, 0 No)",
        id: "newlyReportedPositive",
    },
    {
        selected: true,
        display: "Newly Tested HIV Positive (1 Yes, 0 No)",
        id: "newlyTestedPositive",
    },
    {
        selected: true,
        display: "Newly Tested HIV Positive initiated on ART (1 Yes, 0 No)",
        id: "newlyTestedAndOnArt",
    },
    { selected: true, display: "On_ART_VL (1 Yes, 0 No)", id: "onArt" },
    { selected: true, display: "ART_No_VL", id: "artNo" },
    { selected: true, display: "Facility", id: "facility" },
    { selected: true, display: "Date of ART initiation", id: "artStartDate" },
    {
        selected: true,
        display: "Client member status ",
        id: "clientMemberStatus",
    },
    { selected: true, display: "Regimen", id: "regimen" },
    {
        selected: true,
        display: "OVC_VL Eligible (1 Yes, 0 No)",
        id: "ovcEligible",
    },
    {
        selected: true,
        display: "Last Viral Load Date",
        id: "lastViralLoadDate",
    },
    {
        selected: true,
        display: "12 Months VLTest done (1 Yes, 0 No)",
        id: "viralLoadIs12Months",
    },
    {
        selected: true,
        display: "6 Months VLTest done (1 Yes, 0 No)",
        id: "viralLoadIs6Months",
    },
    {
        selected: true,
        display: "OVC_VLR (1 Yes, 0 No, Waiting )",
        id: "viralLoadResultsReceived",
    },
    {
        selected: true,
        display: "Viral Load Status (Suppressed, Non Suppressed, Waiting)",
        id: "viralLoadStatus",
    },
    { selected: true, display: "Sample type", id: "sampleType" },
    { selected: true, display: "Viral Load Copies", id: "viralLoadCopies" },
    { selected: true, display: "OVC_VLS (1 Yes, 0 No))", id: "VLSuppressed" },
    {
        selected: true,
        display: "On multi month Dispensing (MMD) Y/N",
        id: "onMultiMonthDispensing",
    },
    { selected: true, display: "Client DSD model", id: "clientDSDModel" },
    {
        selected: true,
        display: "Client TB Preventive Therapy Status ",
        id: "currentTBPreventionStatus",
    },
    {
        selected: true,
        display: "Screened for T.B during the last visit ",
        id: "screened4TB",
    },
    {
        selected: true,
        display: "T. B Screening status ",
        id: "tbScreeningStatus",
    },
    { selected: true, display: "Current TB status", id: "currentTBStatus" },
    { selected: true, display: "On TB treatment(N/Y/NA)", id: "onTBTreatment" },
    {
        selected: true,
        display: "Has the person Disclosed or Disclosed to? Y/N",
        id: "hasThePersonDisclosed",
    },
    { selected: true, display: "Mother Baby Pair", id: "motherBabyPair" },
    { selected: true, display: "HEI Individual Code", id: "heiCode" },
    { selected: true, display: "EID No", id: "eidNo" },
    { selected: true, display: "EID Enrollment date", id: "eidEnrollmentDate" },
    { selected: true, display: "Mother's Name", id: "motherName" },
    { selected: true, display: "Mother's Art No", id: "motherArtNo" },
    { selected: true, display: "Mother's Facility", id: "motherFacility" },
    {
        selected: true,
        display:
            "HEI up to date with Immunization schedule (check immunization/child health card): Y/N",
        id: "heiUptoDateWithImmunization",
    },
    { selected: true, display: "1st PCR Date", id: "dateFirstPCRDone" },
    { selected: true, display: "1st PCR Results", id: "firstPCRResults" },
    { selected: true, display: "2nd PCR Date", id: "dateSecondPCRDone" },
    { selected: true, display: "2nd PCR Results", id: "secondPCRResults" },
    { selected: true, display: "3rd PCR Date", id: "dateThirdPCRDone" },
    { selected: true, display: "3rd PCR Results", id: "thirdPCRResults" },
    {
        selected: true,
        display: "Due date for HIV rapid Test",
        id: "hivTestDueDate",
    },
    // {
    //     selected: true,
    //     display: "Date when HIV rapid test was done",
    //     id: "dateHivTestDone",
    // },
    { selected: true, display: "HIV test result", id: "hivTestResults" },
    { selected: true, display: "Final Outcome", id: "finalOutcome" },
    // { selected: true, display: "PCR Test", id: "pcr" },
    {
        selected: true,
        display: "Missed Appointment Date",
        id: "missedAppointmentDate",
    },
    {
        selected: true,
        display: "Missed Appointment in the Quarter",
        id: "missedAnAppointment",
    },
    {
        selected: true,
        display: "Missed Appointment Reason",
        id: "missedAnAppointmentReason",
    },
    { selected: true, display: "Type of follow up", id: "followupType" },
    {
        selected: true,
        display: "Followup Outcome",
        id: "missedAnAppointmentFollowupOutcome",
    },
    {
        selected: true,
        display: "Ever Missed An Appointment in the Year",
        id: "hasEverMissedAnAppointment",
    },
    { selected: true, display: "VSLA", id: "VSLA" },
    { selected: true, display: "VSLA Saving ", id: "VSLASavings" },
    { selected: true, display: "VSLA Training", id: "VSLATraining" },
    { selected: true, display: "Group Based Financial Literacy", id: "" },
    { selected: true, display: "Bank Linkages", id: "bankLinkages" },
    { selected: true, display: "Agribusiness", id: "agricLinkages" },
    { selected: true, display: "SPM Training", id: "SPMTraining" },
    { selected: true, display: "Micro Franchise", id: "microFranchise" },
    { selected: true, display: "IGA Booster", id: "igaBooster" },
    {
        selected: true,
        display: "Temporary Food support",
        id: "tempConsumption",
    },
    { selected: true, display: "VSLA Borrowing", id: "VSLABorrowing" },
    {
        selected: true,
        display: "VSLA OVC protection Fund",
        id: "ovcProtectionFunds",
    },

    {
        selected: true,
        display: "Vocational/Apprenticeship",
        id: "apprenticeship",
    },
    {
        selected: true,
        display: "Linked to Gvernment social protection programs",
        id: "governmentSocialProtection",
    },
    {
        selected: true,
        display: "Direct Beneficiaries operating an IGA",
        id: "operatingAnIGA",
    },
    {
        selected: true,
        display:
            "Direct Beneficiaries operating an IGA registering success in their IGAs",
        id: "igaRegisteringSuccess",
    },
    { selected: true, display: "Output Markets", id: "outputMarkets" },
    { selected: true, display: "CORE_ES", id: "coreES" },
    {
        selected: true,
        display: "Are you currently enrolled in school? (School Mapping)",
        id: "enrolledAtSchool",
    },
    {
        selected: true,
        display: "Name of your current School",
        id: "currentSchool",
    },
    {
        selected: true,
        display: "In which Class are you in",
        id: "currentClass",
    },
    {
        selected: true,
        display: "Monitored at school",
        id: "monitoringAtSchool",
    },
    {
        selected: true,
        display: "Regularly attending school",
        id: "regularlyAttendingSchool",
    },
    { selected: true, display: "Education subsidy", id: "educationSubsidy" },
    { selected: true, display: "OVC VSLA Education Fund", id: "educationFund" },
    {
        selected: true,
        display: "Scholastic Materials",
        id: "scholasticMaterials",
    },
    { selected: true, display: "School Fees", id: "schoolFees" },
    {
        selected: true,
        display: "Supported to enrol in school",
        id: "supportedToEnroll",
    },
    { selected: true, display: "CORE EDUCATION", id: "coreEducation" },
    { selected: true, display: "VSLA OVC Health Fund", id: "healthFund" },
    { selected: true, display: "HTS referral", id: "HTSReferral" },
    {
        selected: true,
        display: "Non Disclosure Support",
        id: "nonDisclosureSupport",
    },
    {
        selected: true,
        display: "Antiretroviral Therapy (ART) Initiation",
        id: "artInitiation",
    },
    { selected: true, display: "HCT/ Tested for HIV", id: "testedForHIV" },
    { selected: true, display: "Attachment to CoRPS", id: "attachedToCorps" },
    {
        selected: true,
        display: "ART Adherence Education",
        id: "artAdherenceEducation",
    },
    {
        selected: true,
        display: "Caregiver/ Adolescent HIV care and treatment literacy",
        id: "hivCareAndLiteracy",
    },
    {
        selected: true,
        display: "Community Viral load Bleeding",
        id: "communityViralLoadBleeding",
    },
    { selected: true, display: "PLHIV Returned to Care", id: "returnedToCare" },
    {
        selected: true,
        display: "Intensive Adherence Counseling (IAC)",
        id: "iac",
    },
    { selected: true, display: "EMTCT", id: "eMTCT" },
    {
        selected: true,
        display: "HIV prevention Education",
        id: "hivPrevention",
    },
    { selected: true, display: "Transport Health", id: "TFHealth" },
    { selected: true, display: "PEP Service", id: "PEP" },
    { selected: true, display: "COVID 19 Education", id: "covid19Education" },
    { selected: true, display: "Linked to DSDM (MMD)", id: "linkedToDSDM" },
    { selected: true, display: "DREAMS", id: "dreams" },
    { selected: true, display: "VMMC", id: "vmmc" },
    {
        selected: true,
        display: "Appointment reminding",
        id: "appointmentReminding",
    },
    { selected: true, display: "Immunization Services", id: "immunization" },
    {
        selected: true,
        display: "Immunization Status",
        id: "immunisationStatus",
    },
    { selected: true, display: "WASH Services", id: "wash" },
    { selected: true, display: "Insecticide Treated Nets", id: "treatedNets" },
    { selected: true, display: "Family Planning", id: "familyPlanning" },
    { selected: true, display: "TB Screening", id: "tbScreening" },
    { selected: true, display: "Risk of TB", id: "atRiskOfTB" },
    { selected: true, display: "Tested for TB", id: "tested4TB" },
    {
        selected: true,
        display: "Initiated on TB Treatment",
        id: "initiatedOnTB",
    },
    {
        selected: true,
        display: "Supported to Complete TB Dose",
        id: "supported2CompleteTBDose",
    },
    {
        selected: true,
        display: "Other Health Related Services",
        id: "otherHealthServices",
    },
    { selected: true, display: "CORE_HEALTH", id: "coreHealth" },
    { selected: true, display: "GBV Prevention Education", id: "GBVEduction" },
    { selected: true, display: "GBV Screening", id: "hasGbvScreening" },
    { selected: true, display: "Reported GBV", id: "reportedGBV" },
    { selected: true, display: "GBV counselling", id: "GBVCounseling" },
    {
        selected: true,
        display: "GBV Referred for further support",
        id: "GBVReferral",
    },
    {
        selected: true,
        display: "Emotional/psychological Abuse",
        id: "emotionalAbuse",
    },
    { selected: true, display: "Physical Abuse", id: "physicalAbuse" },
    { selected: true, display: "Sexual Abuse", id: "sexualAbuse" },
    {
        selected: true,
        display: "IPV related to HIV status disclosure",
        id: "IPVHIVDisclosure",
    },
    { selected: true, display: "Transport_GBV", id: "TFGBV" },
    {
        selected: true,
        display: "Withdrawn from GBV affected Household",
        id: "withdrawnFromGVBHousehold",
    },
    { selected: true, display: "GBV Legal support", id: "GBVLegalSupport" },
    { selected: true, display: "Basic needs", id: "basicNeed" },
    {
        selected: true,
        display: "Basic needs(Direct Beneficiary)",
        id: "basicNeedsDirect",
    },
    {
        selected: true,
        display: "Child Protection Legal support",
        id: "legalSupport",
    },
    { selected: true, display: "RE Integration", id: "reIntegration" },
    {
        selected: true,
        display: "Withdrawn from Child labor",
        id: "withdrawFromLabour",
    },
    {
        selected: true,
        display: "Assisted to handle Child abuse or neglect case",
        id: "handleChildAbuse",
    },
    { selected: true, display: "Birth registration", id: "birthRegistration" },
    { selected: true, display: "NMN (Boys)", id: "NMNBoys" },
    {
        selected: true,
        display: "NMN Venue (e.g. Church/Community Ctr. Name )",
        id: "NMNVenue",
    },
    {
        selected: true,
        display: "NMN Delivery Method [In School, After School, Out of School]",
        id: "NMNDeliveryMethod",
    },
    { selected: true, display: "NMN Group Name", id: "NMNGroupName" },
    { selected: true, display: "Attended ECD", id: "AttendedECD" },
    { selected: true, display: "Completed ECD", id: "completedECD" },
    { selected: true, display: "Attended SINOVUYO", id: "attendedSinovuyo" },
    { selected: true, display: "Completed SINOVUYO", id: "completedSinovuyo" },
    {
        selected: true,
        display: "Child Protection Education",
        id: "childProtectionEducation",
    },
    {
        selected: true,
        display: "CORE CHILD PROTECTION",
        id: "coreChildProtection",
    },
    {
        selected: true,
        display: "Nutrition education",
        id: "nutritionEducation",
    },
    {
        selected: true,
        display: "Nutritional Assessment",
        id: "nutritionalAssessment",
    },
    {
        selected: true,
        display: "Nutrition Status ",
        id: "nutritionalStatus",
    },
    { selected: true, display: "Voucher for crops", id: "voucher4Crops" },
    {
        selected: true,
        display: "Supported to establish Kitchen Garden",
        id: "kitchenGarden",
    },
    {
        selected: true,
        display: "Nutritional Food Supplement",
        id: "nutritionalFoodSupplement",
    },
    {
        selected: true,
        display: "Agricultural and farming inputs",
        id: "farmingInputs",
    },
    {
        selected: true,
        display: "Agric Advisory service",
        id: "agricAdvisoryService",
    },
    { selected: true, display: "CORE_NUTRITION", id: "coreNutrition" },
    { selected: true, display: "PSS", id: "psychosocialSupport" },
    { selected: true, display: "Mental Health (E/P)", id: "mentalHealth" },
    {
        selected: true,
        display: "Recreation Activities",
        id: "recreationActivities",
    },
    { selected: true, display: "Will Writing", id: "willWriting" },
    { selected: true, display: "Assistive devices", id: "assistiveDevices" },
    { selected: true, display: "CORE_PSS", id: "corePSS" },
    { selected: true, display: "3 or More CPAS", id: "CPas" },
    {
        selected: true,
        display: "Served in Previous Quarter",
        id: "servedInPreviousQuarter",
    },
    {
        selected: true,
        display: "Served in Current Quarter",
        id: "servedInCurrentQuarter",
    },
    {
        selected: true,
        display: "Pre /Graduated(1 Yes, 0 No)",
        id: "preGraduated",
    },
    {
        selected: true,
        display: "Fully Graduated(1 Yes, 0 No)",
        id: "fullyGraduated",
    },
    { selected: true, display: "OVC_SERV (Comprehensive)", id: "OVC_SERV" },
    { selected: true, display: "OVC_SERV PREV ", id: "OVC_SERV_PREV" },
    {
        selected: true,
        display: "Overall OVC_SERV (COMP+PREV) ",
        id: "OVC_SERV_OVERALL",
    },
    { selected: true, display: "OVC_ENROL", id: "OVC_ENROL" },
    { selected: true, display: "OVC_SERV_SUBPOP", id: "OVC_SERV_SUBPOP" },
    {
        selected: true,
        display: "OVC_HIV STAT (1 Yes, 0 No, )",
        id: "OVC_HIV_STAT",
    },
    { selected: true, display: "Asset Ownership", id: "assetOwnership" },
    {
        selected: true,
        display: "Exited With Graduation",
        id: "exitedWithGraduation",
    },
    {
        selected: true,
        display: "Para-social Worker / NMN Instructor",
        id: "NMNInstructor",
    },
    {
        selected: true,
        display: "Telephone No. of Para /social Worker",
        id: "paraSocialWorker",
    },
    {
        display: "Data Entrant",
        id: "dataEntrant",
        selected: true,
    },
    {
        display: "Last Generated",
        id: "generated",
        selected: true,
    },
];

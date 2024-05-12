export interface RootObject {
    pager?: { totalPages: number; pageCount: number };
    trackedEntityInstances: TrackedEntityInstance[];
}

export interface TrackedEntityInstance {
    created: string;
    orgUnit: string;
    createdAtClient: string;
    trackedEntityInstance: string;
    lastUpdated: string;
    trackedEntityType: string;
    lastUpdatedAtClient: string;
    potentialDuplicate: boolean;
    inactive: boolean;
    deleted: boolean;
    featureType: string;
    programOwners: ProgramOwner[];
    enrollments: Enrollment[];
    relationships: any[];
    attributes: Attribute[];
    coordinates?: string;
    geometry?: Geometry;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Attribute {
    lastUpdated: string;
    storedBy: string;
    code: string;
    displayName: string;
    created: string;
    valueType: string;
    attribute: string;
    value: string;
}

export interface Enrollment {
    storedBy: string;
    createdAtClient: string;
    program: string;
    lastUpdated: string;
    created: string;
    orgUnit: string;
    trackedEntityInstance: string;
    enrollment: string;
    trackedEntityType: string;
    orgUnitName: string;
    lastUpdatedAtClient: string;
    enrollmentDate: string;
    deleted: boolean;
    incidentDate: string;
    status: string;
    notes: any[];
    relationships: any[];
    events: Event[];
    attributes: Attribute[];
}

export interface Event {
    storedBy: string;
    dueDate: string;
    createdAtClient?: string;
    program: string;
    event: string;
    programStage: string;
    orgUnit: string;
    trackedEntityInstance: string;
    enrollment: string;
    enrollmentStatus: string;
    status: string;
    orgUnitName: string;
    lastUpdatedAtClient?: string;
    eventDate: string;
    attributeCategoryOptions: string;
    lastUpdated: string;
    created: string;
    deleted: boolean;
    attributeOptionCombo: string;
    dataValues: DataValue[];
    notes: any[];
    relationships: any[];
    completedDate?: string;
    completedBy?: string;
}

export interface DataValue {
    lastUpdated: string;
    storedBy: string;
    created: string;
    dataElement: string;
    value: string;
    providedElsewhere: boolean;
}

export interface ProgramOwner {
    ownerOrgUnit: string;
    program: string;
    trackedEntityInstance: string;
}

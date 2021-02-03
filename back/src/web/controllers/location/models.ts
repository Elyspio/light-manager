import {Any, Property, Required} from "@tsed/schema";

export class LocationCoordinateModel {
    @Property(Number)
    @Required()
    latitude!: number;

    @Property(Number)
    @Required()
    longitude!: number;

    @Any("number", null)
    @Required()
    altitude!: number | null;

    @Any("number", null)
    @Required()
    accuracy!: number | null;

    @Any("number", null)
    @Required()
    altitudeAccuracy!: number | null;

    @Any("number", null)
    @Required()
    heading!: number | null;

    @Any("number", null)
    @Required()
    speed!: number | null;
}


export class LocationObjectModel {
    @Property(LocationCoordinateModel)
    @Required()
    coords!: LocationCoordinateModel

    @Property(Number)
    @Required()
    timestamp!: number;
}

export class LocationObjectModelWithId extends LocationObjectModel {
    @Property(Number)
    id!: number
}


export class UserModel {
    @Property(Number)
    @Required()
    id!: number;

    @Property(String)
    name: string | undefined
}

export class LocationUserModel {
    @Property(UserModel)
    user!: UserModel

    @Property(LocationObjectModel)
    location!: LocationObjectModel
}

export class LocationUserModelWithId extends LocationUserModel {
    @Property(UserModel)
    user!: UserModel

    @Property(LocationObjectModelWithId)
    location!: LocationObjectModelWithId
}

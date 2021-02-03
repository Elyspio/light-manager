import {BaseAssembler} from "./index";
import {LocationObjectModel, UserModel} from "../controllers/location/models";
import {LocationEntity} from "../../core/database/entities/locationEntity";
import {UserEntity} from "../../core/database/entities/userEntity";

export class LocationAssembler implements BaseAssembler<LocationObjectModel, Omit<LocationEntity, "user" | "id">> {

    toModel(entity: Omit<LocationEntity, "user" | "id">): LocationObjectModel {
        return {
            coords: {
                speed: entity.speed,
                longitude: entity.longitude,
                latitude: entity.latitude,
                accuracy: entity.accuracy,
                altitude: entity.altitude,
                altitudeAccuracy: entity.altitudeAccuracy,
                heading: entity.heading
            },
            timestamp: entity.timestamp
        };
    }
}

export class UserAssembler implements BaseAssembler<UserModel, Omit<UserEntity, "lastLocation" | "locations">> {

    toModel(entity: Omit<UserEntity, "lastLocation" | "locations">): UserModel {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}

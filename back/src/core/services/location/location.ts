import {LocationObjectModelWithId, LocationUserModel, UserModel} from "../../../web/controllers/location/models";
import {Repositories} from "../../database/repositories";
import {UserEntity} from "../../database/entities/userEntity";


export type LocationRecord = { location: LocationObjectModelWithId, user: UserModel };

export class LocationService {

    public async addRecord(locationUser: LocationUserModel) {
        let user = await Repositories.user!.getById(locationUser.user.id)
        let coords = locationUser.location.coords;
        const location = await Repositories.location!.add({
            user,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
            timestamp: locationUser.location.timestamp,
        });
        user = await Repositories.user!.updateLastLocation(location);
        return {
            user,
            location
        }
    }

    public async getUsers(): Promise<Array<Pick<UserEntity, "id" | "name">>> {
        return (await Repositories.user!.getAll()).map(user => ({id: user.id, name: user.name}))
    }

    async getUserById(id: number) {
        return (await Repositories.user!.getById(id));
    }


    public async getAllRecords(): Promise<LocationRecord[]> {
        const users = await this.getUsers();
        const locations = (await Promise.all(users.map(u => Repositories.location!.getAllByUser(u.id)))).flat()
        return locations.map(l => ({
            location: {
                timestamp: l.timestamp,
                coords: {
                    heading: l.heading,
                    altitudeAccuracy: l.altitudeAccuracy,
                    altitude: l.altitude,
                    accuracy: l.accuracy,
                    latitude: l.latitude,
                    longitude: l.longitude,
                    speed: l.speed
                },
                id: l.id
            },
            user: l.user
        }))
    }
}

import {EntityRepository, Repository} from "typeorm";
import {LocationEntity} from "../entities/locationEntity";
import {UserEntity} from "../entities/userEntity";

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {
    public getAll() {
        return super.find()
    }

    public async getAllByUser(userId: UserEntity["id"]) {
        return await super.find({where: {user: {id: userId}}, relations: ["user"]})
    }

    public async add(location: Omit<LocationEntity, "id">): Promise<LocationEntity> {
        return await super.save(location)
    }
}

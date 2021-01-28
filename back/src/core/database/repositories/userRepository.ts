import {EntityRepository, Repository} from "typeorm";
import {LocationEntity} from "../entities/locationEntity";
import {UserEntity} from "../entities/userEntity";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public getAll() {
        return super.find()
    }

    public async add(location: QueryDeepPartialEntity<UserEntity>) {
        return await super.insert(location)
    }

    public async getById(id: UserEntity["id"]): Promise<UserEntity> {
        return (await super.find({where: {id: id}}))[0]
    }

    public async updateLastLocation(location: LocationEntity) {
        location.user.lastLocation = location;
        return super.save(location.user);
    }
}

import {LocationAssembler, UserAssembler} from "./locations";

export interface BaseAssembler<Model, Entity> {
    toModel(model: Entity): Model
}


export const Assemblers = {
    location: new LocationAssembler(),
    user: new UserAssembler()
}

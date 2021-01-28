import {UserRepository} from "./userRepository";
import {LocationRepository} from "./locationRepository";

type Repositories = {
    user?: UserRepository,
    location?: LocationRepository,
}

export const Repositories: Repositories = {
    location: undefined,
    user: undefined
}

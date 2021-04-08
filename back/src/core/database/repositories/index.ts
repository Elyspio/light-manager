import {UserRepository} from "./userRepository";
import {LocationRepository} from "./locationRepository";
import {LightLogRepository} from "./logs/lightLogRepository";

type Repositories = {
    user: UserRepository,
    location: LocationRepository,
    logs: {
        lights: LightLogRepository,
    }
}

export const Repositories: Repositories = {
    location: undefined,
    user: undefined,
    logs: {
        light: undefined
    }
} as any as Repositories

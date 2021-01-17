import {ApiServices} from "./Api";
import {EnvironmentService} from "./Environments";
import {LightService} from "./light/LightService";

export const Services = {
    api: new ApiServices(),
    light: LightService.instance,
    environments: new EnvironmentService()
}

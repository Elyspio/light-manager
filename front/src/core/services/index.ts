import {ApiServices} from "./Api";
import {ConfigService} from "./Config";
import {LightService} from "./light/LightService";

export const Services = {
    api: new ApiServices(),
    light: LightService.instance,
    config: new ConfigService()
}

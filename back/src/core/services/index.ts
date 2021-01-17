import {AuthenticationService} from "./authentication";
import {Storage} from "./storage";
import {LightManager} from "./light/manager";

export const Services = {
    authentication: new AuthenticationService(),
    storage: new Storage(),
    light: LightManager.instance
}

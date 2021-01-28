import {AuthenticationService} from "./authentication";
import {Storage} from "./storage";
import {LightManager} from "./light/manager";
import {LocationService} from "./location/location";

export const Services = {
    authentication: new AuthenticationService(),
    storage: new Storage(),
    light: new LightManager(),
    location: new LocationService()
}

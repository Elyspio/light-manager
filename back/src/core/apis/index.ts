import {AuthenticationApi} from "./authentication";
import {DevicesApi} from "./freebox";

export const Apis = {
    authentication: new AuthenticationApi({basePath: "https://elyspio.fr/authentication"}),
    freebox: {
        device: new DevicesApi()
    }
}

import {AuthenticationApi} from "./authentication";

export const Apis = {
    authentication: new AuthenticationApi({basePath: "https://elyspio.fr/authentication"})
}
import {EnvironmentsApi, LightControllerApi} from "./back"
import {createEndpoints} from "../../config";

type Apis = {
    core: {
        light: LightControllerApi,
        environments: EnvironmentsApi
    }
}


export var Apis: Apis = createApis();

export function createApis(): Apis {

    const endpoints = createEndpoints();

    Apis = {
        core: {
            light: new LightControllerApi({basePath: endpoints.core.api}),
            environments: new EnvironmentsApi({basePath: endpoints.core.api})
        },
    }
    return Apis;
}





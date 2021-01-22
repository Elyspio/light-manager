import {EnvironmentsApi, LightControllerApi, PresetControllerApi} from "./back"
import {getEndpoint} from "../../view/store/module/config/reducer";

type Apis = {
    core: {
        light: LightControllerApi,
        config: EnvironmentsApi,
        preset: PresetControllerApi
    }
}


export var Apis: Apis = createApis();

export function createApis(): Apis {

    const core = getEndpoint("core");

    Apis = {
        core: {
            light: new LightControllerApi({basePath: core.api}),
            config: new EnvironmentsApi({basePath: core.api}),
            preset: new PresetControllerApi({basePath: core.api})
        },
    }
    return Apis;
}





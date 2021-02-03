import {Apis} from "../apis";
import store from "../store";
import {setEndpoints, setEnvironment} from "../store/module/config/action";
import {ConfigState, getEndpoint} from "../store/module/config/reducer";


export class ConfigService {
    async getServerEnvironmentsVariables() {
        try {
            const {data} = await Apis.core.config.environmentsGet()
            store.dispatch(setEnvironment(data))
            store.dispatch(setEndpoints(this.reloadEndpoints(data)))
            return data
        } catch (e) {
            return {"error": "Fetching is not authorized on this server."}
        }
    }


    reloadEndpoints(envs: ConfigState["envs"]): ConfigState["endpoints"] {

        const {socket, api} = getEndpoint("core")

        return {
            core: {
                api,
                socket
            }
        }
    }
}

import {Apis} from "../apis";
import store from "../../view/store";


export class EnvironmentService {
    async getServerEnvironmentsVariables() {
        try {
            const {data} = await Apis.core.environments.environmentsGet()
            return data
        } catch (e) {
            return {"error": "Fetching is not authorized on this server."}
        }
    }

    get = (name: string, fallback?: string): string => {
        return store.getState().environment.envs[name] ?? fallback
    }

}

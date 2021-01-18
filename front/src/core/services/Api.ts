import {createApis} from "../apis";
import {Services} from "./index";
import {listenSocket} from "../../view/store/module/lights/reducer";
import {createSocket} from "./light/socket";

export class ApiServices {
    public async refresh() {
        await Services.config.getServerEnvironmentsVariables();
        createApis()
        listenSocket(createSocket())
    }
}

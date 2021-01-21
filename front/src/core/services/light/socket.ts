import io from "socket.io-client";
import {getEndpoint} from "../../../view/store/module/config/reducer";

export const createSocket = () => {
    let endpoint = getEndpoint("core");
    return io(endpoint.socket.path, {
        path: "/light-manager" + endpoint.socket.path
    });
};

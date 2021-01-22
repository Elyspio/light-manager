import io from "socket.io-client";
import {getEndpoint} from "../../../view/store/module/config/reducer";

export const createSocket = () => {
    let endpoint = getEndpoint("core");
    return io(endpoint.socket.uri + endpoint.socket.path, {
        path: (process.env.NODE_ENV === "production" ? "/light-manager" : "") + endpoint.socket.path,
        transports: ["websocket"]
    });
};

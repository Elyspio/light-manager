import io from "socket.io-client";
import {getEndpoint} from "../../../view/store/module/config/reducer";

export const createSocket = () => {
    let endpoint = getEndpoint("core");
    const server =  io(clearUrl(endpoint.socket.hostname), {
        transports: ["websocket"],
        autoConnect: false
    });
    server.nsp = clearUrl(endpoint.socket.namespace)
    server.io.opts.path = clearUrl((process.env.NODE_ENV === "production" ? "/light-manager/" : "/") + endpoint.socket.namespace)
    return server.connect();
};



function clearUrl(url: string): string {
    return url.replaceAll("//", "/")
}

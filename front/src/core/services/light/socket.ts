import io from "socket.io-client";
import {getEndpoint} from "../../../view/store/module/config/reducer";

export const createSocket = () => io(getEndpoint("core").socket, {
    transports: ["websocket"]
});

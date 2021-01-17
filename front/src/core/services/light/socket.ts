import {endpoints} from "../../../config";

import io from "socket.io-client";

export const createSocket = () => io(endpoints.core.socket, {
    transports: ["websocket"]
});

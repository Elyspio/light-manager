import socketIO from "socket.io-client";
import {socketServerUrl} from "../config/sockets";

export const socket = socketIO(socketServerUrl);

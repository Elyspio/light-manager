import socketIO from "socket.io-client"
import {serverURL} from "../config/sockets";


export const socket = socketIO(serverURL)

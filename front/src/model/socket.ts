import socketIO from "socket.io-client"

const serverUrl = "localhost:4000"

export const socket = socketIO(serverUrl)

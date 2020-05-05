import {discover} from "./module/light/discover";
import {LightManager} from "./module/light/manager";
import {Light} from "./module/light/light";
import path from "path";
import {Server} from "socket.io";
import {urlencoded} from "body-parser";
import {socketEvents} from "./config/socket";
import {lightRouter} from "./server/LightRouter";
import {Ip} from "./module/light/types";
import {Express, static as expressStatic} from "express";

const app = require('express')();
const cors = require('cors')

app.use(urlencoded({extended: true}));
app.use(cors());
app.use("/light", lightRouter)

app.set("title", "toto");

const server = require('http').Server(app);
export const socketIoServer: Server = require('socket.io')(server);
const lm = LightManager.instance;

discover();

lm.on(LightManager.events.updateLights, (lights: Light[]) => {
	socketIoServer.sockets.emit(socketEvents.updateAll, lights.map(l => l.json()));
})


lm.on(LightManager.events.refreshLight, (ip: Ip) => {
	const sended = socketIoServer.sockets.emit(socketEvents.updateLight, ip);
})

server.listen(4000);

socketIoServer.on('connection', (socket) => {
	socket.emit(socketEvents.updateAll, lm.get().map(l => l.json()));

});

const httpExpress: Express = require("express")();
httpExpress.use(expressStatic(path.resolve(__dirname, "../../front/build")));
httpExpress.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../../front/build"))
})
httpExpress.listen(80, () => {
	console.log("listening on port 80")
})

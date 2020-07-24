import {Express, Router} from "express";
import {LightManager} from "../../module/light/manager";
import {SwitchAllRequest} from "./requests";
import {Responses} from "./responses";
import {initRoutesByLights} from "./SpecificLightRouter";
import {json, urlencoded} from "body-parser";
import {logger, loggerConfig} from "../../util/logger";
import {Light} from "../../module/light/light";
import {socketEvents} from "../../config/socket";
import {Ip} from "../../module/light/types";
import {Server} from "socket.io";
import * as net from "net";

const cors = require("cors");


const manager = LightManager.instance;
const app: Express = require("express")();
export const server: net.Server = require("http").Server(app);
export const socketIoServer: Server = require("socket.io")(server);


app.use(urlencoded({extended: true}));
app.use(json());
app.use(cors());

app.use((req, res, next) => {
    logger?.log("request", `Got a request`, {
        method: req.method,
        url: req.originalUrl,
        from: req.hostname,
        data: req.method === "get" ? req.params : req.body
    })
    next();
})

const router = Router();
app.use("/core", router);
initRoutesByLights(router);
router.all("/switch", async (req: SwitchAllRequest, res) => {
    const light = manager.get();
    for (const l of light) {
        if (l.powered !== (req.query.state.toLowerCase() === "true")) {
            await l.toggle();
        }
    }

    setTimeout(() => Responses.ok(res, light), 100);
});

router.get("/", async (req, res) => {
    const lights = manager.get();
    res.json(lights.map((l) => l.json()));
});

manager.on(LightManager.events.updateLights, (lights: Light[]) => {
    logger.log("client ws update", manager.get().map((l) => l.ip))
    socketIoServer.sockets.emit(
        socketEvents.updateAll,
        lights.map((l) => l.ip)
    );
});

manager.on(LightManager.events.refreshLight, (ip: Ip) => {
    socketIoServer.sockets.emit(socketEvents.updateLight, ip);
});

socketIoServer.on("connection", (socket) => {
    logger.log("client ws connection", manager.get().map((l) => l.ip))
    socket.emit(
        socketEvents.updateAll,
        manager.get().map((l) => l.ip)
    );
});

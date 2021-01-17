import {IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {LightManager} from "../../../core/services/light/manager";
import {Light} from "../../../core/services/light/light";
import {Services} from "../../../core/services";
import {$log} from "@tsed/common";
import {socketEvents} from "../../../config/light/socket";
import {Ip} from "../../../core/services/light/types";

@SocketService("/socket.io/lights")
export class MySocketService {

    @Nsp nsp!: SocketIO.Namespace;

    constructor(@IO private io: SocketIO.Server) {
        Services.light.on(LightManager.events.newLight, (lights: Light[]) => {
            const lights2 = Services.light.get() as Light[]

            $log.info("client ws update", lights2.map((l) => l.ip))
            io.sockets.emit(
                socketEvents.updateAll,
                lights2.map((l) => l.ip)
            );
        });

        Services.light.on(LightManager.events.refreshLight, (ip: Ip) => {
            io.sockets.emit(socketEvents.updateLight, ip);
        });
    }

    /**
     * Triggered the namespace is created
     */
    $onNamespaceInit(nsp: SocketIO.Namespace) {

    }

    /**
     * Triggered when a new client connects to the Namespace.
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        const lights = Services.light.get() as Light[]
        $log.info("client ws connection", lights.map((l) => l.ip))
        socket.emit(
            socketEvents.updateAll,
            lights.map((l) => l.ip)
        );
    }

    /**
     * Triggered when a client disconnects from the Namespace.
     */
    $onDisconnect(@Socket socket: SocketIO.Socket) {

    }
}

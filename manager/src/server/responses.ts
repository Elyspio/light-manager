import {Light} from "../module/light/light";
import {Response} from "express";
import {socketIoServer} from "../app";
import {socketEvents} from "../config/socket";
import {Ip} from "../module/light/types";

export namespace Responses {
	export const notSupported = (res: Response) => res.status(500).send({
		error: "NIY",
		message: "Not implemented yet"
	})

	export const unknownLight = (res: Response, ip: Ip) => res.status(500).send({
		error: "NoLight",
		message: `Could not find light: "${ip}"`
	})

	export const ok = (res: Response, light: Light | Light[]) => {
		if ((light as Light).ip && (light as Light).name) {
			light = light as Light;
			socketIoServer.sockets.emit(socketEvents.updateLight, light.ip);
			res.send(
				`<!DOCTYPE html> <html lang="en" ><head><title>${light.name}</title></head></html>`
			)
		} else {
			const c = socketIoServer.sockets.emit(socketEvents.updateAll, (light as Light[]).map(l => l.json()));
			res.end();
		}
	};
}

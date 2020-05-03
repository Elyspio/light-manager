import {Light} from "../module/light/light";
import {Response} from "express";

export namespace Responses {
	export const notSupported = (res: Response) => res.status(500).send(JSON.stringify({
		error: "NIY",
		message: "Not implemented yet"
	}))

	export const unknownLight = (res: Response, light: Light) => res.status(500).send(JSON.stringify({
		error: "NoLight",
		message: `Could not find light: "${light.ip}"`
	}))

	export const ok = (res: Response) => res.status(200).end();
}

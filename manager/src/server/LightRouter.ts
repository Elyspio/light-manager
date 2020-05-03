import {Response, Router} from "express";
import {LightManager} from "../module/light/manager";
import {SetColorRequest} from "./requests";

export const lightRouter = Router();

const manager = LightManager.instance

const notSupported = (res: Response) => res.status(500).send(JSON.stringify({
	error: "NIY",
	message: "Not implemented yet"
}))
const ok = (res: Response) => res.status(200).end();

lightRouter.post("/:lightIp/color", async (req: SetColorRequest, res) => {
	const light = manager.get(req.params.lightIp)
	const {rgb, colorTemp, hsv} = req.body.color
	if (colorTemp) {
		notSupported(res);
	}
	if (rgb) {
		await light.setColor(rgb)
	}
	if (hsv) {
		await light.setColor(hsv)
	}

	ok(res);
})


lightRouter.post("/:lightIp/toggle", async (req, res) => {
	const light = manager.get(req.params.lightIp)
	await light.toggle();
	setTimeout(() => ok(res), 100)
})

lightRouter.get("/:lightIp", async (req, res) => {
	const light = manager.get(req.params.lightIp)
	res.send(JSON.stringify(light.json()))
})

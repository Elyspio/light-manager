import {Router} from "express";
import {LightManager} from "../module/light/manager";
import {LightRequest, SetColorRequest, ToggleRequest} from "./requests";
import {Responses} from "./responses";

export const lightRouter = Router();

const manager = LightManager.instance


lightRouter.post("/:lightIp/color", async (req: SetColorRequest, res) => {
	const light = manager.get(req.params.lightIp)
	const {rgb, colorTemp, hsv} = req.body.color
	if (colorTemp) {
		Responses.notSupported(res);
	}
	if (rgb) {
		await light.setColor(rgb)
	}
	if (hsv) {
		await light.setColor(hsv)
	}

	Responses.ok(res);
})


lightRouter.post("/:lightIp/toggle", async (req: ToggleRequest, res) => {
	const light = manager.get(req.params.lightIp)
	if (light === undefined) {
		Responses.unknownLight(res, light);
	}
	await light.toggle();
	setTimeout(() => Responses.ok(res), 100)
})

lightRouter.get("/:lightIp", async (req: LightRequest, res) => {
	const light = manager.get(req.params.lightIp)
	if (light === undefined) {
		Responses.unknownLight(res, light);
	}
	res.send(JSON.stringify(light.json()))
})

lightRouter.get("/", async (req, res) => {
	const lights = manager.get()
	res.send(JSON.stringify(lights.map(l => l.json())))
})

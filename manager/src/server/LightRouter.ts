import {Router} from "express";
import {LightManager} from "../module/light/manager";
import {
	LightRequest,
	SetColorRequest,
	SwitchAllRequest,
	ToggleRequest
} from "./requests";
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
		Responses.notSupported(res);
	}

	Responses.ok(res, light);
})


lightRouter.all("/:lightIp/toggle", async (req: ToggleRequest, res) => {
	const light = manager.get(req.params.lightIp)
	if (light === undefined) {
		Responses.unknownLight(res, req.params.lightIp);
		return;
	}
	await light.toggle();
	setTimeout(() => Responses.ok(res, light), 100)
})

lightRouter.all("/switch", async (req: SwitchAllRequest, res) => {
	const light = manager.get()
	for (const l of light) {
		if (l.powered !== (req.query.state.toLowerCase() === "true")) {
			await l.toggle()
		}
	}

	setTimeout(() => Responses.ok(res, light), 100)
})

lightRouter.get("/:lightIp", async (req: LightRequest, res) => {
	const light = manager.get(req.params.lightIp)
	if (light === undefined) {
		Responses.unknownLight(res, req.params.lightIp);
		return;
	}
	res.send(JSON.stringify(light.json()))
})

lightRouter.get("/", async (req, res) => {
	const lights = manager.get()
	res.send(JSON.stringify(lights.map(l => l.json())))
})

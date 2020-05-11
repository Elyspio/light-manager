import {Router} from "express";
import {LightManager} from "../../module/light/manager";
import {SwitchAllRequest} from "./requests";
import {Responses} from "./responses";
import {initRoutesByLights} from "./SpecificLightRouter";

export const lightRouter = Router();

const manager = LightManager.instance


initRoutesByLights();

lightRouter.all("/switch", async (req: SwitchAllRequest, res) => {
	const light = manager.get()
	for (const l of light) {
		if (l.powered !== (req.query.state.toLowerCase() === "true")) {
			await l.toggle()
		}
	}

	setTimeout(() => Responses.ok(res, light), 100)
})


lightRouter.get("/", async (req, res) => {
	const lights = manager.get()
	res.send(JSON.stringify(lights.map(l => l.json())))
})

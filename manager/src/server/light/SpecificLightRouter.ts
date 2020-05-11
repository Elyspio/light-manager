import {Response} from "express";

import {lightRouter} from "./LightRouter";
import {Responses} from "./responses";
import {LightManager} from "../../module/light/manager";
import {
	LightRequest,
	PresetRequest,
	SetBrightnessRequest,
	SetColorRequest,
	SwitchRequest,
	ToggleRequest
} from "./requests";
import {presets} from "../../config/lights";

const manager = LightManager.instance


function register(path: string, callback: (req: LightRequest, res: Response) => void) {
	console.log("register", `/:lightIp/${path}`);
	return lightRouter.all(`/:lightIp/${path}`, callback);
}


export function initRoutesByLights() {
	register("color", async (req: SetColorRequest, res) => {
		const light = manager.get(req.params.lightIp)
		const {rgb, colorTemp, hsv} = req.body.color

		try {
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
		} catch (e) {
			res.send(e);
		}
	});


	register("toggle", async (req: ToggleRequest, res) => {
		const light = manager.get(req.params.lightIp)
		try {
			if (light === undefined) {
				Responses.unknownLight(res, req.params.lightIp);
				return;
			}

			try {
				await light.toggle();
			} catch (e) {
				res.send(e)
			}

			setTimeout(() => Responses.ok(res, light), 100)
		} catch (e) {
			console.error("ERROR in toggle", light)
		}

	})

	register("switch", async (req: SwitchRequest, res) => {
		const light = manager.get(req.params.lightIp)
		try {
			if (light === undefined) {
				Responses.unknownLight(res, req.params.lightIp);
				return;
			}

			try {
				const wanted = req.query.state === "true";
				if (wanted !== light.powered) {
					await light.toggle();
				}
			} catch (e) {
				res.send(e)
			}

			setTimeout(() => Responses.ok(res, light), 100)
		} catch (e) {
			console.error("ERROR in toggle", light)
		}

	})

	register("preset/:preset", async (req: PresetRequest, res) => {
		const light = manager.get(req.params.lightIp)
		if (light === undefined) {
			Responses.unknownLight(res, req.params.lightIp);
			return;
		}

		switch (req.params.preset) {
			case "day":
				await light.setHsv(presets.day.value, "sudden", 1)
				break;
			case "night":
				await light.setColor(presets.night.value, "sudden", 1)
				break;
		}
		setTimeout(() => Responses.ok(res, light), 100)
	})


	register("", async (req: LightRequest, res) => {
		const light = manager.get(req.params.lightIp)
		if (light === undefined) {
			Responses.unknownLight(res, req.params.lightIp);
			return;
		}
		res.send(JSON.stringify(light.json()))
	})

	register("brightness", async (req: SetBrightnessRequest, res) => {
		const light = manager.get(req.params.lightIp);
		if (light === undefined) {
			Responses.unknownLight(res, req.params.lightIp);
			return;
		}

		try {
			const {value: percentage, duration, effect} = req.body

			if (percentage === 0) {
				await light.setState(false);
			} else {
				if (!light.powered) {
					await light.setState(true);
				}
				await light.setBrighness(percentage, effect, duration)
			}

		} catch (e) {
			res.send(e);
			return;
		}

		setTimeout(() => Responses.ok(res, light), 100)
	})
}




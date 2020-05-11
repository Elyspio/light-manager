import {LightData} from "../../../manager/src/module/light/light";
import {minDelay, serverURL} from "../config/sockets";
import store from "../store";

export type LightPreset = "day" | "night"

type LightIdentifier = Pick<LightData, "ip">;

export class LightService {


	private lastCall = 0;
	private readonly base = `${serverURL}/light`;


	private static _instance: LightService;
	public static get instance() {
		if (LightService._instance === undefined) LightService._instance = new LightService();
		return LightService._instance
	}

	public async toggle(light: LightIdentifier) {
		if (this.iCanCall()) await fetch(`${this.base}/${light.ip}/toggle`, {method: "GET"})
	}

	public async refresh(light: LightIdentifier) {
		return fetch(`${this.base}/${light.ip}`).then(raw => raw.json())
	}

	public async refreshAll(): Promise<LightData[]> {
		return fetch(`${this.base}/`).then(raw => raw.json())
	}


	public async switchAll(state: boolean) {
		return fetch(`${this.base}/switch?state=${state}`, {method: "GET"})
	}


	public async setPreset(theme: LightPreset, light?: LightIdentifier) {
		if (light === undefined) {
			const lights = store.getState().light.lights;
			for (const light of lights) {
				await fetch(`${this.base}/${light.ip}/preset/${theme}`, {method: "GET"})
			}
		} else {
			return await fetch(`${this.base}/${light.ip}/preset/${theme}`, {method: "GET"})
		}
	}

	public async setState(current: LightIdentifier, state: boolean) {
		return fetch(`${this.base}/${current.ip}/switch?state=${state}`, {method: "GET"})
	}

	public async setBrighness(current: LightIdentifier, value: number) {

		if (this.iCanCall()) {
			return fetch(`${this.base}/${current.ip}/brightness?value=${value}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({value, effect: "smooth", duration: 500})
			})
		}
	}

	public async powerOnly(current: LightData) {
		const lights = store.getState().light.lights.filter(l => l.powered && l.ip !== current.ip)
		await Promise.all([
			...lights.map(l => this.setState(l, false)),
			this.setState(current, true)
		])

	}

	private iCanCall = () => {
		const able = Date.now() > this.lastCall + minDelay;
		if (able) {
			this.lastCall = Date.now();
		} else {
			// throw new Error(`You need to wait ${(Date.now() - this.lastCall) / 1000}s before the next API call`)
		}
		return able;
	}
}


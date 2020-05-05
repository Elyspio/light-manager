import {LightData} from "../../../manager/src/module/light/light";
import {minDelay, serverURL} from "../config/sockets";

export class LightService {

	private lastCall = 0;
	private readonly base = `${serverURL}/light`;


	private static _instance: LightService;
	public static get instance() {
		if (LightService._instance === undefined) LightService._instance = new LightService();
		return LightService._instance
	}

	public async toggle(light: Pick<LightData, "ip">) {
		if (this.iCanCall()) await fetch(`${this.base}/${light.ip}/toggle`, {method: "GET"})
	}

	public async refresh(light: Pick<LightData, "ip">) {
		return fetch(`${this.base}/${light.ip}`).then(raw => raw.json())
	}

	public async refreshAll(): Promise<LightData[]> {
		return fetch(`${this.base}/`).then(raw => raw.json())
	}


	public async switchAll(state: boolean) {
		return fetch(`${this.base}/switch?state=${state}`, {method: "GET"})
	}


	private iCanCall = () => {
		const able = Date.now() > this.lastCall + minDelay;
		if (able) {
			this.lastCall = Date.now();
		} else {
			throw `You need to wait ${(Date.now() - this.lastCall) / 1000}s before the next API call`
		}
		return able;
	}

}


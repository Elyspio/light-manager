import {LightData} from "../../../manager/src/module/light/light";
import {serverURL} from "../config/sockets";

export class LightService {


	private static readonly base = `${serverURL}/light`;

	public static async toggle(light: LightData) {
		await fetch(`${this.base}/${light.ip}/toggle`, {method: "POST"})
	}

	public static async refresh(light: LightData) {
		return await fetch(`${this.base}/${light.ip}`).then(raw => raw.json())
	}
}


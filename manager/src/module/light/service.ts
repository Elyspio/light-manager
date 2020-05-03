import {Socket} from "net";
import {
	ColorMode,
	ColorRgb,
	LampParam,
	LampProperty,
	LampSocketReturn
} from "./types";
import {Light, LightData} from "./light";
import {Helper} from "./helper";


export type LightEffect = "sudden" | "smooth"

export class LightService {

	private tcp: {
		client: Socket
	}
	private light: Light;

	private constructor(light: Light) {
		this.light = light;
		this.tcp = {
			client: new Socket()
		}
	}

	public static async init(light: Light): Promise<{ data: Partial<LightData>, service: LightService }> {
		const instance = new LightService(light)

		return new Promise(async resolve => {
			instance.tcp.client.connect({
				host: instance.light.ip,
				port: instance.light.port
			}, async () => {
				// console.log("Connected to lights", this.tcp.client.address());
				const response = await instance.getProps()
				console.log("data", response);
				resolve({
					data: {
						powered: response.power === "on",
						color: Helper.convertColor(response.rgb as number),
						brightness: response.bright as number,
						mode: response.color_mode as ColorMode,
					},
					service: instance
				});
			})
		});
	}

	private static convert(raw: (string | number)[], cols: string[]): { [key: string]: string } {
		if (raw.length !== cols.length) {
			console.log(raw, cols)
			throw "There is not the same number of output than input in model result"
		}
		const obj = {};
		for (let i = 0; i < raw.length; i++) {
			obj[cols[i]] = raw[i];
		}
		return obj;
	}

	public async getProps(props?: any[]): Promise<{ [key in LampProperty]: string | number }> {
		if (!props) props = proprieties
		let data = await this.interact({
			method: "get_prop",
			params: props,
			id: this.light.id
		});
		if (data.result) {
			return LightService.convert(data.result, props) as { [key in LampProperty]: string | number };
		}
		throw data;
	}

	public setRgb(color: ColorRgb, duration?: number, effect?: LightEffect) {

		return this.interact({
			method: "set_rgb",
			params: [Helper.convertColor(color), effect, duration],
			id: this.light.id
		}, {timeout: duration})
	}

	public setColorTemperature(ct_value: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_ct_abx",
			params: [ct_value, effect, duration],
			id: this.light.id
		}, {timeout: duration})
	}

	public setHsv(hue: number, sat: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_hsv",
			params: [hue, sat, effect, duration],
			id: this.light.id
		}, {timeout: duration})
	}


	public setBright(brightness: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_bright",
			params: [brightness, effect, duration],
			id: this.light.id
		}, {timeout: duration})
	}

	public setPower(state: boolean, mode: ColorMode, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_power",
			params: [state ? "on" : "off", effect, duration, mode],
			id: this.light.id
		}, {timeout: duration})
	}


	public setScene(cls: string, values: number[]) {
		return this.interact({
			method: "set_scene",
			params: [cls, ...values],
			id: this.light.id
		})
	}

	public setDefault() {
		return this.interact({
			method: "set_default",
			params: [],
			id: this.light.id
		})
	}

	public toggle() {
		return this.interact({
			method: "toggle",
			params: [],
			id: this.light.id
		})
	}

	public setCron(type: number, value: number) {
		return this.interact({
			method: "cron_add",
			params: [type, value],
			id: this.light.id
		})
	}

	public getCron(type: number) {
		return this.interact({
			method: "cron_get",
			params: [type],
			id: this.light.id
		})
	}

	public deleteCron(type: number) {
		return this.interact({
			method: "cron_del",
			params: [type],
			id: this.light.id
		})
	}

	public setMusic(action: number, host: string, port: number) {
		return this.interact({
			method: "set_music",
			params: [action, host, port],
			id: this.light.id
		})
	}

	public setName(name: string) {
		return this.interact({
			method: "set_name",
			params: [name],
			id: this.light.id
		})
	}


	private async interact(data: LampParam, config?: { timeout: number }): Promise<LampSocketReturn> {
		return new Promise((resolve, reject) => {
			const cb = (message) => {
				// console.log("interact", message.toString());
				this.tcp.client.off("data", cb);
				let raw: TcpLightResponse = JSON.parse(message.toString());
				if (raw.error) {
					reject(raw);
				}

				if (raw.result) {
					const parse: LampSocketReturn = {
						result: raw.result.map(r => {
							const converted = Number.parseFloat(r);
							if (Number.isNaN(converted)) return r
							return converted;
						}),
						id: raw.id
					};

					//  console.log("finish", data);
					if (config?.timeout) {
						setTimeout(() => {
							// console.log("finish", data);
							resolve(parse)
						}, config.timeout)
					} else {
						// console.log("finish", data)
						resolve(parse)
					}
				}


			}
			this.tcp.client.on("data", cb)

			//console.log("data send to " + this.lights.ip, data);

			data.params = data.params.filter(d => d !== undefined);

			this.tcp.client.write(JSON.stringify(data) + "\r\n");
		})

	}
}


const proprieties = ["power", "bright", "ct", "rgb", "hue", "sat", "color_mode", "flowing", "delayoff", "flow_params", "music_on", "name"]

interface TcpLightResponse {
	id: number,
	result?: string[],
	error?: {
		code: number,
		message: string
	}
}

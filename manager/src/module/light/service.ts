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

	private static requestId = 0;

	private tcp: {
		client: Socket
		returns: Map<number, { call: Pick<LampParam, "params" | "method">, callback: (data: LampSocketReturn) => void }>
	}
	private light: Light;

	private constructor(light: Light) {
		this.light = light;
		this.tcp = {
			client: new Socket(),
			returns: new Map()
		}

		this.tcp.client.on("data", data => {

			const raw = JSON.parse(data.toString());
			console.log("TCP return from lamp", raw)
			if (raw.result) {
				const parse: LampSocketReturn = {
					result: raw.result.map(r => {
						const converted = Number.parseFloat(r);
						if (Number.isNaN(converted)) return r
						return converted;
					}),
					id: raw.id
				};

				const callback = this.tcp.returns.get(parse.id)?.callback;
				if (callback) {
					callback(parse);
				}
			}
		})

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
						...LightService.convertProps(response),
						connected: true
					},
					service: instance
				});
			})

			instance.tcp.client.on("end", (e) => {
				console.error(`Connection with ${instance.light.ip} ended`, e)
				light.setConnected(false)
				instance.tcp.client.setTimeout(1000, () => {
					instance.tcp.client.connect({
						host: instance.light.ip,
						port: instance.light.port
					})
					light.setConnected(true);

				})
			})

		});
	}


	public static convertProps(data: { [key in LampProperty]: string | number }): Partial<LightData> {
		return {
			powered: data.power === "on",
			color: Helper.convertColor(data.rgb as number),
			brightness: data.bright as number,
			mode: data.color_mode as ColorMode,
		}
	}

	public static equal(l1: LightData, l2: LightData): boolean {
		return JSON.stringify(l1) === JSON.stringify(l2)
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
		}, {timeout: duration})
	}

	public setColorTemperature(ct_value: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_ct_abx",
			params: [ct_value, effect, duration],
		}, {timeout: duration})
	}

	public setHsv(hue: number, sat: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_hsv",
			params: [hue, sat, effect, duration],
		}, {timeout: duration})
	}

	public setBright(brightness: number, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_bright",
			params: [brightness, effect, duration],
		}, {timeout: duration})
	}

	public setPower(state: boolean, mode: ColorMode, duration?: number, effect?: LightEffect) {
		return this.interact({
			method: "set_power",
			params: [state ? "on" : "off", effect, duration, mode],
		}, {timeout: duration})
	}

	public setScene(cls: string, values: number[]) {
		return this.interact({
			method: "set_scene",
			params: [cls, ...values],
		})
	}

	public setDefault() {
		return this.interact({
			method: "set_default",
			params: [],
		})
	}

	public toggle() {
		return this.interact({
			method: "toggle",
			params: [],
		})
	}

	public setCron(type: number, value: number) {
		return this.interact({
			method: "cron_add",
			params: [type, value],
		})
	}

	public getCron(type: number) {
		return this.interact({
			method: "cron_get",
			params: [type],
		})
	}

	public deleteCron(type: number) {
		return this.interact({
			method: "cron_del",
			params: [type],
		})
	}

	public setMusic(action: number, host: string, port: number) {
		return this.interact({
			method: "set_music",
			params: [action, host, port],
		})
	}

	public setName(name: string) {
		return this.interact({
			method: "set_name",
			params: [name],
		})
	}

	public async refresh(): Promise<Partial<LightData>> {
		return LightService.convertProps(await this.getProps());
	}

	private async interact(data: Pick<LampParam, "params" | "method">, config?: { timeout: number }): Promise<LampSocketReturn> {
		return new Promise((resolve, reject) => {

			const callback = (data: LampSocketReturn) => {
				if (data.error) {
					reject(data);
				}
				if (config?.timeout) {
					setTimeout(() => resolve(data), config.timeout)
				} else {
					resolve(data);
				}
			}
			data.params = data.params.filter(d => d !== undefined);
			let id = LightService.requestId;
			this.tcp.returns.set(id, {call: data, callback: callback})

			const request = {
				...data,
				id
			}

			console.info(request);
			this.tcp.client.write(JSON.stringify(request) + "\r\n");
		})

	}

}

const proprieties = ["power", "bright", "ct", "rgb", "hue", "sat", "color_mode", "flowing", "delayoff", "flow_params", "music_on", "name"]

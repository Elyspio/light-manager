import {LightEffect, LightService} from "./service";
import {ColorMode, ColorRgb, Ip} from "./types";


export interface ColorHsv {
	hue: number,
	sat: number
}

export type LightData = {
	ip: Ip,
	color?: ColorRgb | ColorHsv,
	mode?: ColorMode
	brightness?: number,
	powered?: boolean
	id: number
	port: number
};

export class Light {

	private data: LightData


	private service: LightService


	private constructor(id: number, ip: Ip, port: number) {
		this.data = {
			ip,
			id: Number.parseInt(id.toString()),
			port
		}
	}

	public get mode() {
		return this.data.mode
	}

	public get port(): Readonly<number> {
		return this.data.port;
	}

	public get ip(): Readonly<Ip> {
		return this.data.ip;
	}

	public get color(): Readonly<ColorRgb | ColorHsv> {
		return this.data.color;
	}

	public get id(): Readonly<number> {
		return this.data.id;
	}

	public get powered(): boolean {
		return this.data.powered
	}

	public static async get(id: number, ip: Ip, port: number) {
		return await new Light(id, ip, port).init();
	}

	public async setColor(color: ColorRgb | ColorHsv, effect?: LightEffect, duration?: number) {

		if ((color as ColorRgb).r !== undefined) {
			if (this.mode !== ColorMode.TurnRgb) {
				await this.service.setPower(true, ColorMode.TurnRgb, duration, effect)
			} else if (this.powered === false) {
				await this.service.toggle()
			}
			await this.service.setRgb(color as ColorRgb, duration, effect)
		}

		if ((color as ColorHsv).hue !== undefined) {
			if (this.mode !== ColorMode.TurnHsv) {
				await this.service.setPower(true, ColorMode.TurnHsv, duration, effect)
			} else if (this.powered === false) {
				await this.service.toggle()
			}
			const hsv = color as ColorHsv
			await this.service.setHsv(hsv.hue, hsv.sat, duration, effect)
		}
		this.data.color = color;
		this.data.powered = true;
	}

	public async setBrighness(percentage: number, effect: LightEffect = "sudden", duration: number = 0) {
		if (percentage < 1 || percentage > 100) {
			throw "Invalid brightness percentage it must be: 1 <= percentage <= 100"
		}
		await this.service.setBright(percentage, duration, effect)
	}


	public async toggle() {
		await this.service.toggle();
		this.data.powered = !this.data.powered;
	}

	public async init(): Promise<Light> {
		const {service, data} = await LightService.init(this);
		this.data = {
			...this.data,
			...data
		}
		this.service = service;
		return this;
	}


	public json() {
		return {
			...this.data
		}
	}
}




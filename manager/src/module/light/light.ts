import {LightEffect, LightService} from "./service";
import {ColorMode, ColorRgb, Ip} from "./types";
import {Helper} from "./helper";
import {names, Room} from "../../config/lights";


export interface ColorHsv {
	hue: number,
	sat: number
}

export type LightData = {
	ip: Ip,
	color?: ColorRgb,
	mode?: ColorMode
	brightness?: number,
	powered?: boolean,
	connected: boolean,
	id: number
	port: number,
	name: string,
	room: Room
};

export class Light {

	private data: LightData


	private service: LightService


	private constructor(id: string, ip: Ip, port: number) {
		this.data = {
			ip,
			id: Number.parseInt(id),
			port,
			connected: false,
			name: names[ip].name,
			room: names[ip].room,
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

	public get name(): string {
		return this.data.name
	}

	public static async get(id: string, ip: Ip, port: number) {
		return await new Light(id, ip, port).init();
	}


	public async setHsv(color: { hue: number, sat: number }, effect?: LightEffect, duration?: number) {
		if (this.data.mode !== ColorMode.TurnHsv)
			await this.service.setPower(true, ColorMode.TurnHsv);
		await this.service.setHsv(color.hue, color.sat, duration, effect)
	}

	public async setColor(color: ColorRgb, effect?: LightEffect, duration?: number) {

		if (this.mode !== ColorMode.TurnRgb) {
			await this.service.setPower(true, ColorMode.TurnRgb, duration, effect)
		} else if (this.powered === false) {
			await this.service.toggle()
		}
		await this.service.setRgb(color, duration, effect)

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

	public async refresh(): Promise<boolean> {
		const newData = await this.service.refresh();
		const prevRawData = this.json();
		const prevData: Partial<LightData> = {
			brightness: prevRawData.brightness,
			powered: prevRawData.powered,
			color: prevRawData.color,
			mode: prevRawData.mode
		}

		const refresh = !Helper.equal(newData, prevData)

		if (refresh) {
			this.data = {
				...this.data,
				...newData
			}
			return true;
		}
		return false;
	}

	async setMode(mode: ColorMode) {
		return this.service.setPower(true, mode);
	}

	setConnected(b: boolean) {
		this.data.connected = b;
	}


	async setState(state: boolean) {
		if(this.powered !== state) {
			return this.toggle();
		}
	}
}




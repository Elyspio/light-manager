import {Light} from "./light";
import {store} from "../../store";
import {LampData} from "../../store/light/reducer";
import {EventEmitter} from "events";
import {Mutex} from "async-mutex"

const mutex = new Mutex();

export class LightManager extends EventEmitter {
	public static events = {
		updateLights: "NEW_LIGHT"
	}

	private readonly lights: Array<Light>;

	private constructor() {
		super();
		this.lights = [];
		const self = this;


		const callback = async () => {
			const release = await mutex.acquire();
			const state = store.getState();
			// console.log("store NB=", state.lights.lamps.length)
			const news = [];
			for (const lamp of state.lamp.lamps) {
				if (this.lights.find(l => l.ip === lamp.ip) === undefined) {
					news.push(lamp);
					console.log(`${lamp.ip} is a new lamp`)
				}
			}
			await this.addLight(news);
			release();
		}

		store.subscribe(callback);

	}

	private static _instance: LightManager

	public static get instance() {

		if (!this._instance) {
			this._instance = new LightManager();
		}

		return this._instance
	}

	public get(): Light[]
	public get(id: number): Light
	public get(ip: string): Light
	public get(idOrIp?: number | string): Light | Light[] {

		if (idOrIp === undefined) {
			return this.lights.sort(((a, b) => a.ip < b.ip ? -1 : 1))
		}

		if (typeof idOrIp === "string") {
			return this.lights.find(l => l.ip === idOrIp);
		}

		if (typeof idOrIp === "number") {
			return this.lights.find(l => l.id === idOrIp);
		}
	}


	private async addLight(data: LampData[]) {
		let refresh = false;
		for (let datum of data) {

			if (this.lights.map(l => l.ip).includes(datum.ip) === false) {
				this.lights.push(await Light.get(datum.id, datum.ip, datum.port))
				console.log("added", datum)
				refresh = true;
			}
		}

		if (refresh) {
			this.emit(LightManager.events.updateLights, this.lights)
			console.log("EMIUT");
		}

	}
}

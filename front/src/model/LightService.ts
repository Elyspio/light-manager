import {LightData} from "../../../manager/src/module/light/light";
import store from "../store";
import {conf} from "../config/conf";

export type LightPreset = "day" | "night";

type LightIdentifier = Pick<LightData, "ip">;

export class LightService {
    private readonly base = `${conf.endpoints.api}/core`;

    static _instance: LightService;

    public static get instance() {
        if (LightService._instance === undefined)
            LightService._instance = new LightService();
        return LightService._instance;
    }

    public async toggle(light: LightIdentifier) {
        return this.call(`${this.baseWithLight(light)}/toggle`);
    }

    public async refresh(light: LightIdentifier) {
        return this.call(this.baseWithLight(light)).then((raw) => raw.json());
    }

    public async refreshAll(): Promise<LightData[]> {
        return this.call(`${this.base}/`).then((raw) => raw.json());
    }

    public async switchAll(state: boolean) {
        return this.call(`${this.base}/switch?state=${state}`);
    }

    public async setPreset(theme: LightPreset, light?: LightIdentifier) {
        if (light === undefined) {
            const lights = store.getState().light.lights;

            return await Promise.all(
                lights.map((l) => this.call(`${this.base}/${l.ip}/preset/${theme}`))
            );
        } else {
            return await this.call(`${this.baseWithLight(light)}/preset/${theme}`);
        }
    }

    public async setState(light: LightIdentifier, state: boolean) {
        return this.call(`${this.baseWithLight(light)}/switch?state=${state}`);
    }

    public async setBrighness(light: LightIdentifier, value: number) {
        return this.call(
            `${this.baseWithLight(light)}/brightness?value=${value}`,
            {
                value,
                effect: "smooth",
                duration: 500,
            },
            {
                method: "POST",
            }
        );
    }

    public async powerOnly(current: LightData) {
        const lights = store.getState().light.lights.filter((l) => l.powered && l.ip !== current.ip);
        await Promise.all([
            ...lights.map((l) => this.setState(l, false)),
            this.setState(current, true),
        ]);
    }

    private baseWithLight = (light: LightIdentifier) => `${this.base}/${light.ip}`;

    private iCanCall = (): true => {

        return true;
    };

    private call = async (url, data?: object, config?: { method?: "GET" | "POST"; ignoreCallLimit?: boolean }) => {

        const method = data ? config?.method : "GET"

        return await fetch(url, {
            method: method,
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
}

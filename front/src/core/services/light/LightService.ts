import {Apis} from "../../apis";
import store from "../../store";
import {BrightnessModelEffectEnum, LightDataModel} from "../../apis/back/models";
import {setLights, setPresets, updateLight} from "../../store/module/lights/action";
import {ColorHelper} from "../../helper/light";
import {timeBetweenWholeUpdate} from "../../../config/light/timers";

export type LightPreset = "day" | "night";

type LightIdentifier = Pick<LightDataModel, "ip">;

export class LightService {

    static _instance: LightService;

    public static get instance() {
        console.log("getting new instance")
        if (LightService._instance === undefined) {
            LightService._instance = new LightService();
            setInterval(LightService._instance.getAll, timeBetweenWholeUpdate)
        }
        return LightService._instance;
    }

    public async toggle(light: LightIdentifier) {
        let {data} = await Apis.core.light.lightControllerToggle(light.ip);
        store.dispatch(updateLight([data]))
        return data;
    }

    public async get(light: LightIdentifier) {
        let {data} = await Apis.core.light.lightControllerGet(light.ip);
        store.dispatch(updateLight([data]))
        return data;
    }

    public async getAll(): Promise<LightDataModel[]> {
        let {data} = await Apis.core.light.lightControllerGetAll();
        store.dispatch(setLights(data))
        return data
    }

    public async switchAll(state: boolean) {
        let {data} = await Apis.core.light.lightControllerSwitchAll(state);
        store.dispatch(updateLight(data))
        return data
    }

    public async setColor(light: LightIdentifier, color: string) {
        let {data} = await Apis.core.light.lightControllerColor(light.ip, {
            rgb: ColorHelper.toRgb(color)
        });
        store.dispatch(updateLight([data]))
        return data
    }

    public async setPreset(theme: LightPreset, light?: LightIdentifier) {
        if (light === undefined) {
            const lights = store.getState().light.lights;
            return await Promise.all(lights.map(l => Apis.core.light.lightControllerPreset(l.ip, theme)))
        } else {
            return Apis.core.light.lightControllerPreset(light.ip, theme);
        }
    }

    public async getPresets() {
        const {data: presets} = await Apis.core.preset.presetControllerGetAll();

        store.dispatch(setPresets(presets));
    }

    public async setState(light: LightIdentifier, state: boolean) {
        const lightData = store.getState().light.lights.find(l => l.ip === light.ip);

        if (lightData && lightData.powered !== state) {
            const data = await this.toggle(light)
            store.dispatch(updateLight([data]))
        }
    }

    public async setBrightness(light: LightIdentifier, value: number) {

        const {data} = await Apis.core.light.lightControllerBrightness(light.ip, {
            value,
            effect: BrightnessModelEffectEnum.Smooth,
            duration: 500,
        })
        store.dispatch(updateLight([data]))
        return data;
    }

    public async powerOnly(current: LightDataModel) {
        const lights = store.getState().light.lights.filter((l) => l.powered && l.ip !== current.ip);
        await Promise.all([
            ...lights.map((l) => this.setState(l.ip, false)),
            this.setState(current, true),
        ]);
    }
}

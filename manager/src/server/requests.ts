import {ColorRgb} from "../module/light/types";

type LightPreset = "day" | "night"

export interface LightRequest extends Express.Request {
	params: {
		lightIp: string,
	}
}

export type SetColorRequest = LightRequest &  {
	body: {
		color: {
			rgb?: ColorRgb,
			colorTemp?: number,
			hsv?: any
		}
	}
}

export interface ToggleRequest extends LightRequest {

}

export interface SwitchAllRequest extends Express.Request {
	query: {
		state: string
	}
}

export type PresetRequest = LightRequest & {
	params: {
		preset: LightPreset
	}
}

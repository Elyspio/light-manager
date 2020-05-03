import {ColorRgb} from "../module/light/types";


export interface LightRequest extends Express.Request {
	params: {
		lightIp: string,

	}
}

export interface SetColorRequest extends LightRequest {
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

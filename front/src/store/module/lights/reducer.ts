import {ActionReducerMapBuilder, createReducer} from "@reduxjs/toolkit"
import {addLight, refreshLight, setForDetail} from "./action";
import {LightData} from "../../../../../manager/src/module/light/light";
import {socket} from "../../../model/socket";
import {socketEvents} from "../../../config/sockets";
import store from "../../index";
import {LightService} from "../../../model/LightService";
import {Ip} from "../../../../../manager/src/module/light/types";

export interface LightState {
	lights: LightData[];
	current?: LightData
}

const defaultState: LightState = {
	lights: [],
	current: undefined
};

export const reducer = createReducer<LightState>(defaultState, (builder: ActionReducerMapBuilder<LightState>) => {
	builder.addCase(addLight, (state, action) => {

		for (const light of action.payload) {
			let index = state.lights.findIndex(l => l.ip === light.ip);
			if (index === -1) {
				state.lights.push(light);
			} else {
				state.lights[index] = light;
			}
		}
	})

	builder.addCase(setForDetail, (state, action) => {
		state.current = state.lights.find(l => l.ip === action.payload);
	})

	builder.addCase(refreshLight, (state, action) => {
		const index = state.lights.findIndex(l => l.ip === action.payload.ip);
		state.lights[index] = action.payload;
	})
})


socket.on(socketEvents.updateAll, (lights: LightData[]) => {
	console.log("UPDATE ALL from server", lights);
	store.dispatch(addLight(lights))
})

socket.on(socketEvents.updateLight, async (ip: Ip) => {
	const refreshed = await LightService.instance.refresh({ip: ip})
	store.dispatch(refreshLight(refreshed))
})



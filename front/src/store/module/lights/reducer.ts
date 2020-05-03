import {ActionReducerMapBuilder, createReducer} from "@reduxjs/toolkit"
import {addLight, refreshLight} from "./action";
import {LightData} from "../../../../../manager/src/module/light/light";
import {socket} from "../../../model/socket";
import {socketEvents} from "../../../config/sockets";
import store from "../../index";
import {LightService} from "../../../model/LightService";
import {Ip} from "../../../../../manager/src/module/light/types";

export interface LightState {
	lights: LightData[];
}

const defaultState: LightState = {
	lights: []
};

export const reducer = createReducer<LightState>(defaultState, (builder: ActionReducerMapBuilder<LightState>) => {
	builder.addCase(addLight, (state, action) => {
		if (state.lights.find(l => l.ip === action.payload.ip) === undefined) {
			state.lights.push(action.payload);
		}
	})

	builder.addCase(refreshLight, (state, action) => {
		const index = state.lights.findIndex(l => l.ip === action.payload.ip);
		state.lights[index] = action.payload;
	})
})


socket.on(socketEvents.update, (lights: LightData[]) => {
	lights.forEach(light => store.dispatch(addLight(light)));
})

socket.on(socketEvents.updateLight, async (ip: Ip) => {
	const refreshed = await LightService.refresh({ip: ip})
	store.dispatch(refreshLight(refreshed))
})


// setInterval(async () => {
// 	const data: LightData[] = await LightService.refreshAll()
// 	const state = store.getState().light.lights;
// 	for (const light of data) {
// 		const currentState = state.find(l => l.ip === light.ip);
// 		if (currentState === undefined) {
// 			addLight(light);
// 		} else {
// 			if (!LightService.equal(light, currentState)) {
// 				refreshLight(light);
// 			}
// 		}
// 	}
//
//
// }, refreshRate)

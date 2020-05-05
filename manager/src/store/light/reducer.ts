import {createReducer} from "@reduxjs/toolkit";
import {addLights, refreshLight} from "./action";

export type LampState = {
	lamps: LampData[]
}

export type LampData = {
	ip: string,
	port: number,
	id: number
}

export const reducer = createReducer<LampState>({lamps: []}, builder => {
	builder.addCase(addLights, (state, action) => {
		if (state.lamps.find(l => l.ip === action.payload.ip) === undefined) {
			state.lamps.push({
				ip: action.payload.ip,
				id: Number.parseInt(action.payload.id.toString()),
				port: action.payload.port
			});
		}
	})

	builder.addCase(refreshLight, (state, action) => {
		const index = state.lamps.findIndex(l => l.ip === action.payload.ip);
		state.lamps[index] = action.payload;
	})
});


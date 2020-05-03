import {createReducer} from "@reduxjs/toolkit";
import {addLight} from "./action";

export type LampState = {
	lamps: LampData[]
}

export type LampData = {
	ip: string,
	port: number,
	id: number
}

export const reducer = createReducer<LampState>({lamps: []}, builder => {
	builder.addCase(addLight, (state, action) => {
		if (state.lamps.find(l => l.ip === action.payload.ip) === undefined) {
			state.lamps.push({
				ip: action.payload.ip,
				id: Number.parseInt(action.payload.id.toString()),
				port: action.payload.port
			});
		}
		console.log("REDUX", JSON.parse(JSON.stringify(state.lamps)));
	})
});



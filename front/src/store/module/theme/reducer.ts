import {createReducer} from "@reduxjs/toolkit";
import {setTheme, toggleTheme} from "./action";
import {getCurrentTheme} from "../../../config/theme";


export interface ThemeState {
	current: "dark" | "light"
}

const defaultState: ThemeState = {
	current: getCurrentTheme()
};

export const reducer = createReducer(defaultState, (builder) => {
	builder.addCase(setTheme, (state, action) => {
		state.current = action.payload;
	})
	builder.addCase(toggleTheme, (state) => {
		state.current = state.current === "light" ? "dark" : "light"
	})

})




import {createReducer} from "@reduxjs/toolkit";
import {setTheme, toggleTheme} from "./action";
import {getUrlTheme, Themes} from "../../../../config/theme";

export interface ThemeState {
    current: Themes
}

const defaultState: ThemeState = {
    current: getUrlTheme(),
};

export const reducer = createReducer(defaultState, (builder) => {
    builder.addCase(setTheme, (state, action) => {
        state.current = action.payload;
    });
    builder.addCase(toggleTheme, (state) => {
        state.current = state.current === "light" ? "dark" : "light";
    });
});

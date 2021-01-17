import {createReducer} from "@reduxjs/toolkit";
import {setEnvironment} from "./action";

export interface EnvironmentState {
    envs: { [key in string]: string }
}

const defaultState: EnvironmentState = {
    envs: {}
};

export const reducer = createReducer(defaultState, ({addCase}) => {
    addCase(setEnvironment, (state, action) => {
        state.envs = action.payload;
    })
});

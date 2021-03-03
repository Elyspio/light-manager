import {createReducer} from "@reduxjs/toolkit";
import {setEndpoints, setEnvironment} from "./action";
import store from "../../index";

const xhr = new XMLHttpRequest()
xhr.open("GET", "/light-manager/conf.json", false)
xhr.send()
const initConf: ConfigState = JSON.parse(xhr.responseText)

export function getEnv(name: keyof ConfigState["envs"]): string {
    return store?.getState().config.envs[name] ?? defaultState.envs[name]
}

export function getEndpoint(name: keyof ConfigState["endpoints"]) {
    return store?.getState().config.endpoints[name] ?? defaultState.endpoints[name]
}

export interface ConfigState {
    envs: { [key in string]: string },
    endpoints: {
        core: {
            api: string
            socket: {
                namespace: string,
                hostname: string
            },
        }
    }
}

const defaultState: ConfigState = {
    envs: {},
    endpoints: {
        core: initConf.endpoints.core
    }
};

export const reducer = createReducer(defaultState, ({addCase}) => {
    addCase(setEnvironment, (state, action) => {
        state.envs = action.payload;
    })
    addCase(setEndpoints, (state, action) => {
        state.endpoints = action.payload;
    })
});

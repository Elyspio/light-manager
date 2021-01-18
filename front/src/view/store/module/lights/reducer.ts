import {ActionReducerMapBuilder, createReducer} from "@reduxjs/toolkit";
import {addLight, setForDetail, updateLight} from "./action";
import store from "../../index";
import {createSocket} from "../../../../core/services/light/socket";
import {Services} from "../../../../core/services";
import {Ip} from "../../../../../../back/src/core/services/light/types";
import {socketEvents} from "../../../../config/light/sockets";
import {Socket} from "socket.io-client";
import {LightDataModel} from "../../../../core/apis/back/models";

export interface LightState {
    lights: LightDataModel[];
    current?: LightDataModel;
}

const defaultState: LightState = {
    lights: [],
    current: undefined,
};

export const reducer = createReducer<LightState>(
    defaultState,
    (builder: ActionReducerMapBuilder<LightState>) => {
        builder.addCase(addLight, (state, action) => {
            for (const light of action.payload) {
                let index = state.lights.findIndex((l) => l.ip === light.ip);
                if (index === -1) {
                    state.lights.push(light);
                } else {
                    state.lights[index] = light;
                }
            }
        });

        builder.addCase(setForDetail, (state, action) => {
            state.current = state.lights.find((l) => l.ip === action.payload);
        });

        builder.addCase(updateLight, (state, action) => {
            action.payload.forEach(light => {
                const index = state.lights.findIndex((l) => l.ip === light.ip);
                state.lights[index] = light;
                state.current = state.lights.find(light => light.id === state.current?.id)
            })
        });
    }
);


export const listenSocket = (socket: typeof Socket = createSocket()) => {

    console.log("creating socket.io client", socket);

    socket.on(socketEvents.updateAll, async (ips: string[]) => {
        console.log("UPDATE ALL from server", ips);

        const lights = await Promise.all(ips.map(ip => Services.light.get({ip})))

        store.dispatch(addLight(lights));
    });

    socket.on(socketEvents.updateLight, async (ip: Ip) => {
        const refreshed = await Services.light.get({ip: ip});
        store.dispatch(updateLight([refreshed]));
    });

}

listenSocket()

import {createReducer} from "@reduxjs/toolkit";
import {addLight, deleteLight, setForDetail, setPresets, updateLight} from "./action";
import store from "../../index";
import {createSocket} from "../../../../core/services/light/socket";
import {Services} from "../../../../core/services";
import {Ip} from "../../../../../../back/src/core/services/light/types";
import {socketEvents} from "../../../../config/light/sockets";
import {Socket} from "socket.io-client";
import {LightDataModel, PresetModel} from "../../../../core/apis/back/models";

export interface LightState {
    lights: LightDataModel[];
    current?: LightDataModel;
    presets: PresetModel[]
}

const defaultState: LightState = {
    lights: [],
    current: undefined,
    presets: []
};

export const reducer = createReducer<LightState>(
    defaultState,
    ({addCase}) => {
        addCase(addLight, (state, action) => {
            for (const light of action.payload) {
                let index = state.lights.findIndex((l) => l.ip === light.ip);
                if (index === -1) {
                    state.lights.push(light);
                } else {
                    state.lights[index] = light;
                }
            }
        });

        addCase(setForDetail, (state, action) => {
            state.current = state.lights.find((l) => l.ip === action.payload);
        });

        addCase(updateLight, (state, action) => {
            action.payload.forEach(light => {
                const index = state.lights.findIndex((l) => l.ip === light.ip);
                state.lights[index] = light;
                state.current = state.lights.find(light => light.id === state.current?.id)
            })
        });

        addCase(deleteLight, (state, action) => {
            state.lights = state.lights.filter(l => l.ip === action.payload)
            if (state.current?.ip === action.payload) state.current = undefined
        })

        addCase(setPresets, (state, action) => {
            state.presets = action.payload;
        })
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


    socket.on(socketEvents.removeLight, ip => {
        store.dispatch(deleteLight(ip));
    })


}

listenSocket()

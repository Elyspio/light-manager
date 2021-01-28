import {ColorMode} from "../../core/services/light/types";

export const refreshRate = 5000;
export const discoverRefresh = 10000;

export const names: { [key: string]: { name: string; room: Room } } = {
    "192.168.0.91": {name: "Lampadaire", room: "living room"},
    "192.168.0.92": {name: "Salon PC", room: "living room"},
    "192.168.0.93": {name: "Salon TV", room: "living room"},
    "192.168.0.94": {name: "Cuisine", room: "others"},
    "192.168.0.95": {name: "Chambre Jonathan", room: "chambers"},
    "192.168.0.96": {name: "Toilettes", room: "others"},
    "192.168.0.97": {name: "Entrée", room: "others"},
    "192.168.0.98": {name: "Salle de bain", room: "others"},
    "192.168.0.99": {name: "Chambre Olivier", room: "chambers"},
};

export type Room = "living room" | "chambers" | "others";

export const presets = {
    day: {
        mode: ColorMode.TurnRgb,
        value: {
            r: 255,
            g: 255,
            b: 255,
        },
    },
    night: {
        mode: ColorMode.TurnRgb,
        value: {
            r: 255,
            g: 161,
            b: 72,
        },
    },
};


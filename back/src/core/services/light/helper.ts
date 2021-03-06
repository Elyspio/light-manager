import {ColorRgb} from "./types";

export interface Helper {
    convertColor(color: ColorRgb): number;

    convertColor(color: number): ColorRgb;
}


export namespace Helper {


    export function convertColorRgbToString(color: ColorRgb): string {
        return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`
    }

    export function convertColor(color: ColorRgb | number): number | ColorRgb {
        if (typeof color === "number") {
            let r, g, b;
            r = Math.floor(color / (1 << 16));
            color %= 1 << 16;
            g = Math.floor(color / (1 << 8));
            color %= 1 << 8;
            b = color;
            return {
                r,
                g,
                b,
            };
        } else if (
            color.g !== undefined &&
            color.b !== undefined &&
            color.r !== undefined
        ) {
            return color.r * (1 << 16) + color.g * (1 << 8) + color.b;
        } else throw "NotImplementedException"
    }

    export function equal(a: object, b: object): boolean {
        const keys = {n: Object.keys(a), p: Object.keys(b)};
        if (keys.n.length !== keys.p.length) return false;

        for (const key of keys.n) {
            if (typeof a[key] === "object") {
                if (!equal(a[key], b[key])) return false;
            } else {
                if (a[key] !== b[key]) {
                    return false;
                }
            }
        }
        return true;
    }
}

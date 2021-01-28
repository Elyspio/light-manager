import {ColorRgbModel} from "../apis/back/models";

export const ColorHelper = {
    fromRgb(rgb: ColorRgbModel): string {
        return `#${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`
    },

    toRgb(color: string): ColorRgbModel {
        const r = color.slice(1, 3)
        const g = color.slice(3, 5)
        const b = color.slice(5, 7)

        return {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
        }

    }
}

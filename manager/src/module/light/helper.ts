import {ColorRgb} from "./types";

export namespace Helper {
	export function convertColor(color: ColorRgb): number;
	export function convertColor(color: number): ColorRgb;

	export function convertColor(color: ColorRgb | number): number | ColorRgb {
		if (typeof color === "number") {
			let r, g, b;
			r = Math.floor(color / (1 << 16));
			color %= (1 << 16);
			g = Math.floor(color / (1 << 8));
			color %= (1 << 8);
			b = color;
			return {
				r, g, b
			}
		} else if (color.g !== undefined && color.b !== undefined && color.r !== undefined) {
			return color.r * (1 << 16) + color.g * (1 << 8) + color.b
		}
	}
}

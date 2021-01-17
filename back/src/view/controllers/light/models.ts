import {Any, Enum, Property, Required} from "@tsed/schema";
import {ColorMode, ColorRgb, Ip} from "../../../core/services/light/types";
import {LightEffect} from "../../../core/services/light/service";
import {LightData} from "../../../core/services/light/light";
import {Room} from "../../../config/light/lights";

class ColorRgbModel implements ColorRgb {
    @Required()
    @Property(Number)
    r: number;

    @Required()
    @Property(Number)
    g: number;

    @Required()
    @Property(Number)
    b: number;


    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class ColorModel {
    @Property(ColorRgbModel)
    @Required()
    rgb?: ColorRgbModel;

    @Property(Number)
    @Required()
    colorTemp?: number;

    @Any()
    @Required()
    hsv?: any;
}

export class BrightnessModel {
    @Property(Number)
    @Required()
    value: number;

    @Property(Number)
    @Required()
    duration: number;

    @Enum("sudden", "smooth")
    @Required()
    effect: LightEffect;


    constructor(value: number, duration: number, effect: LightEffect) {
        this.value = value;
        this.duration = duration;
        this.effect = effect;
    }
}


export class LightDataModel implements LightData {
    @Property(Number)
    @Required()
    brightness: number;

    @Property(ColorRgbModel)
    @Required()
    color: ColorRgb;

    @Property(Boolean)
    @Required()
    connected: boolean;

    @Property(Number)
    @Required()
    id: number;

    @Property()
    @Required()
    ip: Ip;

    @Enum(ColorMode)
    @Required()
    mode: ColorMode;

    @Property()
    @Required()
    name: string;

    @Property(Number)
    @Required()
    port: number;

    @Property(Boolean)
    @Required()
    powered: boolean;

    @Enum("living room", "chambers", "others")
    @Required()
    room: Room;


    constructor(brightness: number, color: ColorRgb, connected: boolean, id: number, ip: Ip, mode: ColorMode, name: string, port: number, powered: boolean, room: Room) {
        this.brightness = brightness;
        this.color = color;
        this.connected = connected;
        this.id = id;
        this.ip = ip;
        this.mode = mode;
        this.name = name;
        this.port = port;
        this.powered = powered;
        this.room = room;
    }
}

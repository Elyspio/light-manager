export type LampMethod =
    | "get_prop"
    | "set_ct_abx"
    | "set_rgb"
    | "set_hsv"
    | "set_bright"
    | "set_power"
    | "toggle"
    | "set_default"
    | "start_cf"
    | "stop_cf"
    | "set_scene"
    | "cron_add"
    | "cron_get"
    | "cron_del"
    | "set_adjust"
    | "set_music"
    | "set_name"
    | "bg_set_rgb"
    | "bg_set_hsv"
    | "bg_set_ct_abx"
    | "bg_start_cf"
    | "bg_stop_cf"
    | "bg_set_scene"
    | "bg_set_default"
    | "bg_set_power"
    | "bg_set_bright"
    | "bg_set_adjust"
    | "bg_toggle"
    | "dev_toggle"
    | "adjust_bright"
    | "adjust_ct"
    | "adjust_color"
    | "bg_adjust_bright"
    | "bg_adjust_ct"
    | "bg_adjust_color";

export type LampParam = {
    id: number;
    method: LampMethod;
    params: any[];
};
export type Ip = string;
export type ColorRgb = {
    r: number;
    g: number;
    b: number;
};
export type LampProperty =
    | "power"
    | "bright"
    | "ct"
    | "rgb"
    | "hue"
    | "sat"
    | "color_mode"
    | "flowing"
    | "delayoff"
    | "flow_params"
    | "music_on"
    | "name";

export type LampSocketReturn = {
    id: number;
    result?: ["ok"] | (number | string)[];
    error?: { code: number; message: string };
};

export enum ColorMode {
    TurnOn,
    TurnCt,
    TurnRgb,
    TurnHsv,
    TurnColorFlow,
}

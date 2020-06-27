import {hostname} from "os";

const config = {
    elyspi: "192.168.0.37",
    "aero-oled": "192.168.0.40",
};

export const inetAdress = config[hostname()];
if (inetAdress === undefined) {
    throw new Error("This hostname is not configured in config/udp");
}

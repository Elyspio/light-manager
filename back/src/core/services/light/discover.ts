import {createSocket} from "dgram";
import {networkInterfaces} from "os";

import {$log} from "@tsed/common";
import * as conf from "../../../config/light/conf.json"
import {discoverRefresh} from "../../../config/light/lights";
import {Services} from "../index";

const allInterfaces = networkInterfaces();
const addresses = Object.keys(allInterfaces)
    .map((key) => allInterfaces[key]?.map((inter) => inter.address))
    .flat();


const interfaceAddress = allInterfaces[conf["multicast-interface"]]?.find(inter => inter.family === "IPv4")?.address

if (!interfaceAddress) {
    throw `Could not find an IPV4 address for interface ${conf[`multicast-interface`]}`
}


export const discover = () => {
    const udpPort = 1982;

    const udpServer = createSocket("udp4");
    let address = "239.255.255.250";
    udpServer.bind(udpPort, () => {
        udpServer.setMulticastInterface(interfaceAddress);
        udpServer.addMembership(address);
    });
    udpServer.on("listening", () => {
        const address = udpServer.address();
        $log.info("UDP Client listening on ", address);
    });

    udpServer.on("message", async (msg, info) => {
        if (!addresses.includes(info.address)) {
            const message = msg.toString().split("\r\n");
            const pairs = Object.fromEntries(message.map((line) => line.split(/: /)));

            if (pairs["Location"] && pairs["id"]) {
                let id = pairs["id"],
                    [ip, port] = pairs["Location"].match(/([0-9]{1,3}\.*){4}/gm);

                await Services.light.addLight({ip, id, port})
                // store.dispatch(addLights({id, ip, port}));
            }
        }
    });

    const askMessage = [
        "M-SEARCH * HTTP/1.1",
        "HOST: 239.255.255.250:1982",
        'MAN: "ssdp:discover"',
        "ST: wifi_bulb",
    ];

    setInterval(() => {
        udpServer.send(askMessage.join("\r\n"), udpPort, address, (error) => {
            if (error) {
                console.error("error in udp send", error);
                throw error;
            }
        });
    }, discoverRefresh);
};

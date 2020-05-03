import {createSocket} from "dgram";
import {store} from "../../store";
import {addLight} from "../../store/light/action";
import {networkInterfaces} from "os";


const allInterfaces = networkInterfaces();
const interfaces = Object.keys(allInterfaces).map(key => allInterfaces[key].map(inter => inter.address)).flat();

export const discover = () => {
	const udpPort = 1982

	const udpServer = createSocket("udp4");
	let address = "239.255.255.250";
	udpServer.bind(udpPort, () => {
		udpServer.setMulticastInterface("192.168.0.40");
		udpServer.addMembership(address);
	});
	udpServer.on("listening", () => {
		const address = udpServer.address();
		console.log('UDP Client listening on ', address);
	})


	udpServer.on("message", (msg, rinfo) => {

		// console.group("message");
		// console.log(msg.toString())
		// console.groupEnd();

		if (!interfaces.includes(rinfo.address)) {
			const message = msg.toString().split("\r\n")
			const pairs = Object.fromEntries(message.map(line => line.split(/: /)))
			// console.log("Got message on udp", pairs);

			if (pairs["Location"] && pairs["id"]) {
				let id = pairs["id"], [ip, port] = pairs["Location"].match(/([0-9]{1,3}\.*){4}/gm);
				store.dispatch(addLight({id, ip, port}))
			}

		}

	})


	const askMessage = ["M-SEARCH * HTTP/1.1",
		"HOST: 239.255.255.250:1982",
		'MAN: "ssdp:discover"',
		"ST: wifi_bulb"]

	udpServer.send(askMessage.join("\r\n"), udpPort, address, (error, bitmap) => {
		if (error) {
			console.error("error in udp send", error);
			throw  error
		}
	});
}

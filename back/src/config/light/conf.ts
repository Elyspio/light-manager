import { env } from "process";

export default {
	"multicast-interface": env.NETWORK_INTERFACE ??  "Ethernet"
}

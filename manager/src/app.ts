import {discover} from "./module/light/discover";
import {ArgumentParser} from "argparse"
import servers from "./server";
import {logger} from "./util/logger";

const parser = new ArgumentParser();
parser.addArgument("--backend-port", {dest: "backendPort", defaultValue: 4000, type: "int"})

const args: { clientPort: number, backendPort: number } = parser.parseArgs();
if(process.env.MANAGER_PORT) {
    args.backendPort =  Number.parseInt(process.env.MANAGER_PORT);
}


servers.light.listen(args.backendPort, () => {
    logger.log("Listening backend on port ", args.backendPort)
});


discover();

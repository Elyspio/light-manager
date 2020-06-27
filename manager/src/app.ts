import {discover} from "./module/light/discover";
import {ArgumentParser} from "argparse"
import servers from "./server";

const parser = new ArgumentParser();
parser.addArgument("--backend-port", {dest: "backendPort", defaultValue: 4000, type: "int"})
const args: { clientPort: number, backendPort: number } = parser.parseArgs();


servers.light.listen(args.backendPort, () => {
    console.log("Listening backend on port ", args.backendPort)
});


discover();

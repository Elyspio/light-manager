import {writeFileSync} from "fs";
import {ArgumentParser} from "argparse"
import {createInterface} from "readline"
import {spawn} from "child_process"

const path = require("path");

const io = createInterface(process.stdin, process.stdout);

const askParam = (key: string, choices: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        const ask = () => io.question(`No ${key} was provided please choose a value between [${choices.map(s => `"${s}"`).join(", ")}]: `, answer => {
            if (choices.map(s => s.toLowerCase()).includes(answer.toLowerCase())) {
                resolve(answer.toLowerCase());
            } else {
                ask();
            }
        })
        ask();
    })
}


const parser = new ArgumentParser();
let modeChoices = ["production", "dev"];
parser.addArgument("--mode", {choices: modeChoices, required: false})
let deviceChoices = ["aero", "raspy"];
parser.addArgument("--device", {choices: deviceChoices, required: false})
parser.addArgument("--build", {action: "storeTrue", required: false})

const args: { mode: "production" | "dev", device: "aero" | "raspy", build?: boolean, [key: string]: any } = parser.parseArgs();
console.log(args);
const ports = {
    aero: {
        production: 40400,
        dev: 4000,
    },
    raspy: {
        production: 37400,
        dev: 4000,
    }
}

const hostnames = {
    aero: {
        production: "aero.elyspio.fr",
        dev: "localhost",
    },
    raspy: {
        production: "pi.elyspio.fr",
        dev: "192.168.0.37",
    }
}

const main = async () => {
    if (!args.mode) {
        args.mode = await askParam("mode", modeChoices) as any
    }

    if (!args.device) {
        args.device = await askParam("device", deviceChoices) as any
    }

    let newConfig = {
        port: ports[args.device][args.mode],
        hostname: hostnames[args.device][args.mode]
    };

    writeFileSync(path.resolve(__dirname, "../src/config/env.json"), JSON.stringify(newConfig));
    console.log("New config :", newConfig);

    if (args.get("build")) {
        const c = spawn("yarn.cmd", ["build-front"], {cwd: path.resolve(__dirname, ".."), stdio: "inherit"})
    }

    io.close();

}

main();

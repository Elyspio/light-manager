import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {middlewares} from "./middleware/common/raw";
import * as path from "path";
import "@tsed/swagger";
import "@tsed/socketio";
import {env} from "process"

export const rootDir = __dirname;
let frontPath = path.resolve(rootDir, "..", "..", "front", "build");

@Configuration({
    rootDir,
    httpPort: env.BACKEND_PORT || 4000,
    httpsPort: false, // CHANGE
    componentsScan: [`${rootDir}/controller/**/*.ts`],
    mount: {
        "/core": [
            `${rootDir}/controllers/**/*.ts`
        ]
    },
    exclude: [
        "**/*.spec.ts"
    ],
    statics: {
        "/": [
            {root: frontPath}
        ]
    },
    swagger: [{
        path: "/swagger",
    }],
    // @ts-ignore
    socketIO: {
        cors: {origin: [env.BACKEND_HOST ?? "http://localhost:3000"]},
        //       path: env.SOCKET_IO_PATH ?? "/light-manager/socket.io/"
    }
})
export class Server {

    @Inject()
    app!: PlatformApplication;

    @Configuration()
    settings!: Configuration;

    $beforeRoutesInit() {
        this.app.use(...middlewares)
        return null;
    }
}

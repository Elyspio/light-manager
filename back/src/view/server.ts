import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {middlewares} from "./middleware/common/raw";
import * as path from "path";
import "@tsed/swagger";
import   "@tsed/socketio";

export const rootDir = __dirname;
let frontPath = path.resolve(rootDir, "..", "..", "front", "build");

@Configuration({
    rootDir,
    httpPort: process.env.HTTP_PORT || 4000,
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
        cors: {origin: ["http://localhost:3000"]},

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

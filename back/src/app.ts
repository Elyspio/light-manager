import {$log} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./web/server";
import {Database} from "./core/database";

if (require.main === module) {
    bootstrap()
}


async function bootstrap() {
    try {
        $log.debug("Start server...");
        await Database.init();

        $log.debug("Start server...");
        const platform = await PlatformExpress.bootstrap(Server, {});
        await platform.listen();
        $log.debug("Server initialized");
    } catch (er) {
        $log.error(er);
    }
}

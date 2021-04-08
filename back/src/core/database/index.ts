import {$log} from "@tsed/common";
import {Connection, createConnection} from "typeorm";
import {Repositories} from "./repositories";
import {databaseOptions} from "../../config/database";
import {UserRepository} from "./repositories/userRepository";
import {LocationRepository} from "./repositories/locationRepository";
import {LightLogRepository} from "./repositories/logs/lightLogRepository";

export class Database {

    private static instance: Connection;

    public static async init() {
        const con = await Database.get();
        Repositories.user = con.getCustomRepository(UserRepository);
        Repositories.location = con.getCustomRepository(LocationRepository);
        Repositories.logs.lights = con.getCustomRepository(LightLogRepository);
    }

    private static async connect() {

        try {
            $log.debug("Trying to connect to database");
            Database.instance = await createConnection(databaseOptions)
        } catch (e) {
            $log.debug("Could not connect to database, try again in 5 seconds");
            $log.debug(e);
            return new Promise((resolve) => {
                setTimeout(() => resolve(this.connect()), 5000)
            })
        }
    }

    private static async get() {
        if (!Database.instance) {
            $log.debug("Start database connection");
            await this.connect();
            $log.debug("Database connection done");
        }
        return Database.instance
    }


}




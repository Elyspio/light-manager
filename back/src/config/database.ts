import {ConnectionOptions} from "typeorm";
import * as path from "path";


export const getEnv = (env: string, fallback) => {
    return process.env[env] ?? fallback;
}


export const databaseOptions: ConnectionOptions = {
    "type": "postgres",
    "host": getEnv("DATABASE_URL", "localhost"),
    "port": getEnv("DATABASE_PORT", 5006),
    "username": getEnv("DATABASE_USER", "postgres"),
    "password": getEnv("DATABASE_PASSWORD", "example"),
    "database": getEnv("DATABASE_DATABASE", "postgres"),
    "synchronize": true,
    "logging": false,
    entities: [path.resolve(__dirname, "..", "core", "database", "entities", "*")]

}

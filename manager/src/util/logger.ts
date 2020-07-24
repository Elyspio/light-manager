import * as path from "path";
import * as fs from "fs"
import {createLogger, transport} from "winston";
import dayjs from "dayjs"

const winston = require('winston');

export const logFolder = process.env.LOG_FOLDER ?? path.resolve(__dirname, "..", "..", "logs");

const dateFormat = () => dayjs().format("DD/MM/YY -- hh:mm:ss")

const getLogFile = (...node: string[]) => path.join(logFolder, ...node)

const getFormat = (colorize: boolean) => {
    const formats = [
        winston.format.timestamp({
            format: dateFormat
        }),
        winston.format.prettyPrint(),
    ]

    if (colorize) {
        formats.push(winston.format.colorize({
            all: true, colors: {
                info: "cyan",
                request: "green",
                debug: "yellow",
                warning: "orange",
                error: "red",
            }
        }));
    }

    return winston.format.combine(...formats);
};

function getTransports(service: string): transport[] {
    const transports: transport[] = [];
    const colorFormat = getFormat(true);
    const noColorFormat = getFormat(false);
    let logPath = path.join(logFolder, service);

    if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath, {recursive: true});
    }
    const day = dayjs().format("DD-MM-YYYY")

    transports.push(
        new winston.transports.File({
            filename: getLogFile(service, day, 'error.color.log'), level: 'error',
            format: colorFormat
        }),
        new winston.transports.File({
            filename: getLogFile(service, day, 'combined.color.log'),
            format: colorFormat
        }),
        new winston.transports.File({
            filename: getLogFile(service, day, 'error.log'), level: 'error',
            format: noColorFormat
        }),
        new winston.transports.File({
            filename: getLogFile(service, day, 'combined.log'),
            format: noColorFormat
        }),
    )

    transports.push(
        new winston.transports.Console({})
    )

    return transports;
}



export const loggerConfig = {
    levels: {
        info: 3,
        request: 4,
        debug: 2,
        warning: 1,
        error: 0,
    },
    transports: getTransports("server"),
    level: "request"
}
export const logger = createLogger(loggerConfig)

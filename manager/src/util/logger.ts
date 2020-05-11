import winston from "winston";
import path from "path";
import fs from "fs-extra"

export const logFolder = path.resolve(__dirname, "..", "..", "logs");
fs.ensureDirSync(logFolder)

export const logger = winston.createLogger({
	transports: [ new winston.transports.File({dirname: logFolder, filename: "log.log"})],
	format: winston.format.combine(
		winston.format.json()
	),
})


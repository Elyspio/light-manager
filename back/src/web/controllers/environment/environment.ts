import {Controller, Get, UseBefore} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {RequireExposedEnvironment} from "../../middleware/environment";
import {EnvironementsModel} from "./models"

@Controller("/environments")
export class Environments {
    @Get("/")
    @UseBefore(RequireExposedEnvironment)
    @Returns(403)
    @Returns(200, EnvironementsModel).ContentType("application/json")
    async get() {
        return JSON.stringify(process.env);
    }
}

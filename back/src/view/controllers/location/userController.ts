import {Controller, Get, PathParams} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {Services} from "../../../core/services";
import {UserModel} from "./models";
import {Assemblers} from "../../assemblers";

@Controller("/locations/users")
export class UserController {
    @Get("/")
    public async getUsers() {
        let users = await Services.location.getUsers();
        return users.map(Assemblers.user.toModel);
    }

    @Get("/:id")
    @Returns(200, UserModel)
    public async getUserById(@PathParams("id") id: number) {
        return Assemblers.user.toModel(await Services.location.getUserById(id));
    }
}

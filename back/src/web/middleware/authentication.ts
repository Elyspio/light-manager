import {IMiddleware, Middleware, QueryParams, Req} from "@tsed/common";
import {Property, Returns} from "@tsed/schema";
import {Unauthorized} from "@tsed/exceptions"
import {Services} from "../../core/services";

export class UnauthorizedModel {

    @Property()
    url: string

    @Property()
    message: string


    constructor(url: string, message: string) {
        this.url = url;
        this.message = message;
    }
}


@Middleware()
export class RequireLogin implements IMiddleware {
    @Returns(401).Of(UnauthorizedModel)
    public async use(@Req() req, @QueryParams("token") token: string) {

        // token ??= token

        try {
            await Services.authentication.isAuthenticated(token)
            return true
        } catch (e) {
            throw new Unauthorized("You must be logged to access to this resource see https://elyspio.fr/authentication");
        }
    }
}

import {IMiddleware, Middleware, PathParams} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {UnauthorizedModel} from "./authentication";
import {LightNotFoundException} from "../../core/exceptions/light/LightNotFoundException";
import {Services} from "../../core/services";


@Middleware()
export class RequireLight implements IMiddleware {
    @Returns(401).Of(UnauthorizedModel)
    public async use(@PathParams("lightIp") lightIp) {
        const light = Services.light.get(lightIp)
        if (light === undefined) {
            throw new LightNotFoundException()
        }
        return true;
    }
}

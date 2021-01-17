import {IMiddleware, Middleware, QueryParams, Req} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {Unauthorized} from "@tsed/exceptions"
import {globalConf} from "../../config/global";
import {UnauthorizedModel} from "./authentication";


@Middleware()
export class RequireExposedEnvironment implements IMiddleware {
    @Returns(401).Of(UnauthorizedModel)
    public async use(@Req() req, @QueryParams("token") token: string) {

        if (globalConf.exposeEnvironmentVariables === true) {
            return true;
        }
        throw new Unauthorized("You can't access to environment variable of this system");
    }
}

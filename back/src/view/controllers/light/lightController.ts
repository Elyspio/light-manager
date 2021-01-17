import {Services} from "../../../core/services";
import {BodyParams, Controller, Get, PathParams, Put, QueryParams, UseBefore} from "@tsed/common";
import {NotImplementedException} from "../../exceptions/NotImplementedException";
import {Light} from "../../../core/services/light/light";
import {LightNotFoundException} from "../../../core/exceptions/light/LightNotFoundException";
import {Returns} from "@tsed/schema";
import {BrightnessModel, ColorModel, LightDataModel} from "./models";
import {RequireLight} from "../../middleware/light";
import {presets} from "../../../config/light/lights";

const manager = Services.light;

@Controller("/lights")
export class LightController {


    @Get("/")
    @Returns(200, Array).Of(LightDataModel)
    async getAll() {
        const lights = manager.get() as Light[];
        return (lights.map((l) => l.json()));
    }

    @Put("/:lightIp/color")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async color(
        @PathParams("lightIp", String) lightIp: string,
        @BodyParams() {colorTemp, hsv, rgb}: ColorModel
    ) {

        const light = manager.get(lightIp) as Light;


        if (colorTemp) {
            throw new NotImplementedException("Could not change color based on color temperature")
        }
        if (rgb) {
            await light.setColor(rgb);
        }
        if (hsv) {
            throw new NotImplementedException("Could not change color based on hsv code")
        }

        return light.json();

    }


    @Put("/:lightIp/toggle")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async toggle(@PathParams("lightIp", String) lightIp: string,) {
        const light = manager.get(lightIp) as Light;


        await light.toggle();

        return light.json();
    }


    @Put("/:lightIp/switch")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async switch(
        @PathParams("lightIp", String) lightIp: string,
        @QueryParams("state") state: boolean
    ) {
        const light = manager.get(lightIp) as Light;


        if (state !== light.powered) {
            await light.toggle();
        }

        return light.json();
    }

    @Put("/switch")
    @Returns(200, Array).Of(LightDataModel)
    async switchAll(@QueryParams("state") state: boolean) {
        const light = manager.get() as Light[];

        await Promise.all(light.map(async l => {
            if (l.powered !== (state)) {
                await l.toggle();
            }
        }))

        return light.map(l => l.json());
    }


    @Put("/:lightIp/preset/:preset")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async preset(
        @PathParams("lightIp", String) lightIp: string,
        @PathParams("preset") preset: "day" | "night"
    ) {
        const light = manager.get(lightIp) as Light;
        switch (preset) {
            case "day":
                await light.setHsv(presets.day.value, "sudden", 1);
                break;
            case "night":
                await light.setColor(presets.night.value, "sudden", 1);
                break;
        }
        return light.json()
    }


    @Get("/:lightIp/")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async get(@PathParams("lightIp", String) lightIp: string,) {
        const light = manager.get(lightIp) as Light;
        return light.json();
    }


    @Put("/:lightIp/brightness")
    @UseBefore(RequireLight)
    @Returns(500, LightNotFoundException)
    @Returns(200, LightDataModel)
    async brightness(
        @PathParams("lightIp", String) lightIp: string,
        @BodyParams(){duration, effect, value: percentage}: BrightnessModel
    ) {
        const light = manager.get(lightIp) as Light;

        if (percentage === 0) {
            await light.setState(false);
        } else {
            if (!light.powered) {
                await light.setState(true);
            }
            await light.setBrightness(percentage, effect, duration);
        }

        return light.json();
    }
}



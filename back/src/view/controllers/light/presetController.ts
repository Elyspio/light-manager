import {Controller, Get} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {PresetModel} from "./models";
import {presets} from "../../../config/light/lights";
import {Helper} from "../../../core/services/light/helper";

@Controller("/presets")
export class PresetController {
    @Get("/")
    @Returns(200, Array).Of(PresetModel)
    getAll() {
        return Object.entries(presets).map(([key, preset]) => {
            return {
                key,
                color: Helper.convertColorRgbToString(preset.value)
            }
        });
    }
}

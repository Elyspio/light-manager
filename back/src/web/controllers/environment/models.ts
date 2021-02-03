import {AdditionalProperties} from "@tsed/schema";

@AdditionalProperties({type: "string"})
export class EnvironementsModel {
    [key: string]: string;
}

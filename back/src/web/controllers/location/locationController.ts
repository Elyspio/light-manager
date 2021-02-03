import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {LocationObjectModel, LocationUserModel, LocationUserModelWithId} from "./models";
import {Services} from "../../../core/services";
import {Assemblers} from "../../assemblers";

@Controller("/locations")
export class LocationController {


    @Get("/")
    @Returns(200, Array).Of(LocationUserModelWithId)
    async getAll(): Promise<LocationUserModelWithId[]> {
        let records = await Services.location.getAllRecords();
        return records;
    }

    @Post("/")
    @Returns(200, LocationObjectModel)
    async addLocation(@BodyParams(LocationUserModel) model: LocationUserModel): Promise<LocationObjectModel> {
        const {location} = await Services.location.addRecord(model);
        return Assemblers.location.toModel(location);
    }

}



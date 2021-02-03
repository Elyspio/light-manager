import {createAction as _createAction} from "@reduxjs/toolkit";
import {LightDataModel, PresetModel} from "../../../apis/back/models";
import {Ip} from "./reducer";

const createAction = <T>(name: string) => _createAction<T>(`light/${name}`);

export const addLight = createAction<LightDataModel[]>("add");
export const setLights = createAction<LightDataModel[]>("set");
export const updateLight = createAction<LightDataModel[]>("refresh");
export const setForDetail = createAction<Ip | undefined>("setForDetail");
export const deleteLight = createAction<Ip>("deleteLight");

export const setPresets = createAction<PresetModel[]>("setPresets")

import {createAction as _createAction} from "@reduxjs/toolkit";
import {Ip} from "../../../../../../back/src/core/services/light/types";
import {LightDataModel, PresetModel} from "../../../../core/apis/back/models";


const createAction = <T>(name: string) => _createAction<T>(`light/${name}`);

export const addLight = createAction<LightDataModel[]>("add");
export const updateLight = createAction<LightDataModel[]>("refresh");
export const setForDetail = createAction<Ip | undefined>("setForDetail");
export const deleteLight = createAction<Ip>("deleteLight");

export const setPresets = createAction<PresetModel[]>("setPresets")

import {createAction as _createAction} from "@reduxjs/toolkit";
import {LightData} from "../../../../../manager/src/module/light/light";

const createAction = <T>(name: string) => _createAction<T>(`light/${name}`);

export const addLight = createAction<LightData[]>("add")
export const refreshLight = createAction<LightData>("refresh")

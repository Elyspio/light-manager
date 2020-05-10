import {createAction as _createAction} from "@reduxjs/toolkit";
import {LightData} from "../../../../../manager/src/module/light/light";
import {Ip} from "../../../../../manager/src/module/light/types";

const createAction = <T>(name: string) => _createAction<T>(`light/${name}`);

export const addLight = createAction<LightData[]>("add")
export const refreshLight = createAction<LightData>("refresh")
export const setForDetail = createAction<Ip | undefined>("setForDetail")

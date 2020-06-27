import {createAction as _createAction} from "@reduxjs/toolkit";
import {LightDataFull} from "../../../../../manager/src/module/light/light";
import {Ip} from "../../../../../manager/src/module/light/types";

const createAction = <T>(name: string) => _createAction<T>(`light/${name}`);

export const addLight = createAction<LightDataFull[]>("add");
export const refreshLight = createAction<LightDataFull>("refresh");
export const setForDetail = createAction<Ip | undefined>("setForDetail");

import {LampData} from "./reducer";
import {createAction as _createAction} from "@reduxjs/toolkit";

const createAction = <P>(name: string) => _createAction<P>("lights/" + name);

export const addLights = createAction<LampData>("add");
export const refreshLight = createAction<LampData>("refresh");

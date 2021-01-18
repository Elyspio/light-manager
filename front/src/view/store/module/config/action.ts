import {createAction as _createAction} from "@reduxjs/toolkit";
import {ConfigState} from "./reducer";

const createAction = <T>(name: string) => _createAction<T>(`environments/${name}`);

export const setEnvironment = createAction<{ [key in string]: string }>("set/config");
export const setEndpoints = createAction<ConfigState["endpoints"]>("set/endpoints");


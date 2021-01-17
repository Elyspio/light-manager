import {createAction as _createAction} from "@reduxjs/toolkit";

const createAction = <T>(name: string) => _createAction<T>(`environments/${name}`);

export const setEnvironment = createAction<{ [key in string]: string }>("set/environments");


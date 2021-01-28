import {combineReducers} from "redux";

import {reducer as themeReducer} from "./module/theme/reducer";
import {reducer as configReducer} from "./module/config/reducer";
import {reducer as lightReducer} from "./module/lights/reducer";
import store from "./index";


export const rootReducer = combineReducers({
    theme: themeReducer,
    config: configReducer,
    light: lightReducer
});


export type  RootState = ReturnType<typeof store.getState>

import {combineReducers} from "redux";

import {reducer as themeReducer, ThemeState} from "./module/theme/reducer";
import {ConfigState, reducer as configReducer} from "./module/config/reducer";
import {LightState, reducer as lightReducer} from "./module/lights/reducer";

export interface RootState {
    theme: ThemeState;
    config: ConfigState,
    light: LightState
}

export const rootReducer = combineReducers<RootState | undefined>({
    theme: themeReducer,
    config: configReducer,
    light: lightReducer
});

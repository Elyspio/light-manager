import {combineReducers} from "redux";

import {reducer as themeReducer, ThemeState} from "./module/theme/reducer";
import {EnvironmentState, reducer as environmentReducer} from "./module/environments/reducer";
import {LightState, reducer as lightReducer} from "./module/lights/reducer";

export interface RootState {
    theme: ThemeState;
    environment: EnvironmentState,
    light: LightState
}

export const rootReducer = combineReducers<RootState | undefined>({
    theme: themeReducer,
    environment: environmentReducer,
    light: lightReducer
});

import {combineReducers} from 'redux';

import {LightState, reducer as lightReducer} from './module/lights/reducer';
import {ThemeState, reducer as themeReducer} from "./module/theme/reducer";

export interface RootState {
	light: LightState;
	theme: ThemeState;
}

export const rootReducer = combineReducers<RootState | undefined>({
	light: lightReducer,
	theme: themeReducer
});

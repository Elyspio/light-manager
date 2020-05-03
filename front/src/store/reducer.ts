import {combineReducers} from 'redux';

import {LightState, reducer as lightReducer} from './module/lights/reducer';

export interface RootState {
	light: LightState;
}

export const rootReducer = combineReducers<RootState | undefined>({
	light: lightReducer
});

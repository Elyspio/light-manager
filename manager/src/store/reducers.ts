import {LampState, reducer as lampReducer} from "./light/reducer";

export type Store = {
	lamp: LampState
}


export default {
	lamp: lampReducer
}

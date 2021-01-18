import {configureStore} from "@reduxjs/toolkit";
import {rootReducer, RootState} from "./reducer";

export const store = configureStore<RootState>({
    reducer: rootReducer,
});

export default store;

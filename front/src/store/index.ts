import {configureStore} from "@reduxjs/toolkit";
import {rootReducer, RootState} from "./reducer";

const store = configureStore<RootState>({
    reducer: rootReducer,
});

export default store;

import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import reducers from "./reducers"

export const store = configureStore({
	reducer: reducers,
	middleware: [...getDefaultMiddleware()],
})

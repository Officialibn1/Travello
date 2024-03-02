import { useDispatch } from "react-redux";
import loggedInSliceReducer from "./features/login/LoginSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		loggedIn: loggedInSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

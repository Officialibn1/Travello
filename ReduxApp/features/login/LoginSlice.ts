import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginData {
	loggedIn: boolean;
	user: {
		name: string;
		email: string;
		password: string;
	} | null;
}

const initialState: LoginData = {
	loggedIn: false,
	user: null,
};

export const loggedInSlice = createSlice({
	name: "loggedIn",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<LoginData>) => {
			(state.loggedIn = true), (state.user = action.payload.user);
		},
		logOut: (state) => {
			(state.loggedIn = false), (state.user = null);
		},
	},
});

export const { logIn, logOut } = loggedInSlice.actions;

export default loggedInSlice.reducer;

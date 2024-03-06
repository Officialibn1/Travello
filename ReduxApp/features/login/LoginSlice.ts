import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
	name: string;
	email: string;
	password: string;
};

export interface LoginData {
	loggedIn: boolean;
	user: User | null;
}

const initialState: LoginData = {
	loggedIn: false,
	user: null,
};

export const loggedInSlice = createSlice({
	name: "loggedIn",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<User>) => {
			(state.loggedIn = true),
				(state.user = action.payload),
				AsyncStorage.setItem("loggedIn", "true");
		},
		logOut: (state) => {
			(state.loggedIn = false),
				(state.user = null),
				AsyncStorage.removeItem("loggedIn");
		},
	},
});

export const { logIn, logOut } = loggedInSlice.actions;

export default loggedInSlice.reducer;

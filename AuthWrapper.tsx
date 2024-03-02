import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainApp from "./App/Navigations/MainApp";
import AuthStack from "./App/Navigations/AuthStack";
import { useAppSelector } from "./App/ReduxHooks";

const AuthWrapper = () => {
	const isLoggedIn = useAppSelector((state) => state.loggedIn.loggedIn);

	return (
		<NavigationContainer>
			{isLoggedIn ? <MainApp /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default AuthWrapper;

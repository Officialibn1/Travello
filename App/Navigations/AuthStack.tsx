import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../Components/OnboardingScreen";
import LoginScreen from "../../Screens/LoginScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "../../Screens/SignupScreen";
import ForgetPassScreen from "../../Screens/ForgetPassScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
	const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

	useEffect(() => {
		const appLaunch = async () => {
			const data = await AsyncStorage.getItem("appLaunched");

			console.log(data);

			if (data === null) {
				setIsFirstLaunch(true);
			} else {
				setIsFirstLaunch(false);
			}
		};

		appLaunch();
	}, []);
	return (
		isFirstLaunch !== null && (
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				{isFirstLaunch && (
					<Stack.Screen
						name='OnboardingScreen'
						component={OnboardingScreen}
					/>
				)}

				{/* SIGN IN SCREEN */}
				<Stack.Screen
					name='LoginScreen'
					component={LoginScreen}
				/>

				{/* SIGN UP SCREEN */}
				<Stack.Screen
					name='SignupScreen'
					component={SignupScreen}
				/>

				{/* FORGET PASSWORD SCREEN */}
				<Stack.Screen
					name='ForgetPassScreen'
					component={ForgetPassScreen}
				/>
			</Stack.Navigator>
		)
	);
};

export default AuthStack;

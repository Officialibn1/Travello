import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../Components/OnboardingScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name='OnboardingScreen'
				component={OnboardingScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;

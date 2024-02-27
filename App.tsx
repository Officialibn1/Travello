import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainApp from "./App/Navigations/MainApp";
import OnboardingScreen from "./App/Components/OnboardingScreen";

import * as SplashScreen from "expo-splash-screen";

import Entypo from "@expo/vector-icons/Entypo";

import {
	useFonts,
	Raleway_100Thin,
	Raleway_200ExtraLight,
	Raleway_300Light,
	Raleway_400Regular,
	Raleway_500Medium,
	Raleway_600SemiBold,
	Raleway_700Bold,
	Raleway_800ExtraBold,
	Raleway_900Black,
	Raleway_100Thin_Italic,
	Raleway_200ExtraLight_Italic,
	Raleway_300Light_Italic,
	Raleway_400Regular_Italic,
	Raleway_500Medium_Italic,
	Raleway_600SemiBold_Italic,
	Raleway_700Bold_Italic,
	Raleway_800ExtraBold_Italic,
	Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	let [fontsLoaded] = useFonts({
		Raleway_100Thin,
		Raleway_200ExtraLight,
		Raleway_300Light,
		Raleway_400Regular,
		Raleway_500Medium,
		Raleway_600SemiBold,
		Raleway_700Bold,
		Raleway_800ExtraBold,
		Raleway_900Black,
		Raleway_100Thin_Italic,
		Raleway_200ExtraLight_Italic,
		Raleway_300Light_Italic,
		Raleway_400Regular_Italic,
		Raleway_500Medium_Italic,
		Raleway_600SemiBold_Italic,
		Raleway_700Bold_Italic,
		Raleway_800ExtraBold_Italic,
		Raleway_900Black_Italic,
	});

	if (!fontsLoaded) {
		SplashScreen.hideAsync();
	}

	return (
		<NavigationContainer>
			{/* <MainApp /> */}

			<OnboardingScreen />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

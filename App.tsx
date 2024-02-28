import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainApp from "./App/Navigations/MainApp";
import OnboardingScreen from "./App/Components/OnboardingScreen";

import * as SplashScreen from "expo-splash-screen";

import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import { Raleway_500Medium } from "@expo-google-fonts/raleway";
import AuthStack from "./App/Navigations/AuthStack";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		Raleway_Black: require("./assets/Fonts/Raleway/static/Raleway-Black.ttf"),
		Raleway_SemiBold: require("./assets/Fonts/Raleway/static/Raleway-SemiBold.ttf"),
		Raleway_ExtraBold: require("./assets/Fonts/Raleway/static/Raleway-ExtraBold.ttf"),
		Raleway_Bold: require("./assets/Fonts/Raleway/static/Raleway-Bold.ttf"),
		Raleway_Medium: require("./assets/Fonts/Raleway/static/Raleway-Medium.ttf"),
		Raleway_ExtraLight: require("./assets/Fonts/Raleway/static/Raleway-ExtraLight.ttf"),
		Raleway_Light: require("./assets/Fonts/Raleway/static/Raleway-Light.ttf"),
		Raleway_Thin: require("./assets/Fonts/Raleway/static/Raleway-Thin.ttf"),
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	onLayoutRootView();

	return (
		<NavigationContainer>
			{/* <MainApp /> */}

			<AuthStack />
		</NavigationContainer>
	);
}

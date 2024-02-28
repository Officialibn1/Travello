import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
	useEffect(() => {
		AsyncStorage.setItem("appLaunched", "launched");
	}, []);

	const clear = () => {
		AsyncStorage.removeItem("appLaunched");
	};
	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
				flex: 1,
				gap: 50,
			}}>
			<Text>LoginScreen</Text>

			<TouchableOpacity onPress={() => clear()}>
				<Text>Clear</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoginScreen;

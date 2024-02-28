import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { containerStyle } from "../App/Shared/Styles";

const HomeScreen = () => {
	return (
		<SafeAreaView>
			<View style={containerStyle.container}>{/* <Header /> */}</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

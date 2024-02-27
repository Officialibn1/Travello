import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { onboardingData } from "../../lib/data";
import OnboardingSlide from "./OnboardingSlide";

const OnboardingScreen = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={onboardingData}
				renderItem={({ item }) => <OnboardingSlide data={item} />}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatList}
				bounces={false}
			/>
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatList: {
		height: hp(80),
		width: wp(304.6),
		// gap: 10,
	},
});

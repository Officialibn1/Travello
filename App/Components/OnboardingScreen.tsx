import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useRef, useState } from "react";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { OnboardingData, onboardingData } from "../../lib/data";
import OnboardingSlide from "./OnboardingSlide";
import { TextStyles } from "../Shared/Styles";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
	const [slideIndex, setSlideIndex] = useState<number>(0);

	const navigation = useNavigation();

	// SLIDE REF
	const slideRef: React.LegacyRef<FlatList<OnboardingData>> | undefined =
		useRef(null);

	// FUNCTION TO UPDATE CURRENT INDEX BASED ON FLATLIST SLIDE
	const updateCSI = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offSetXIndex = e.nativeEvent.contentOffset.x;

		const index = Math.round(offSetXIndex / wp(100));

		setSlideIndex(index);
	};

	const nextSlideFunc = () => {
		if (slideIndex === 2) {
			navigation.reset({
				index: 0,
				routes: [
					{
						name: "LoginScreen" as never,
					},
				],
			});
		} else {
			const nextSlideIndex = slideIndex === 2 ? slideIndex : slideIndex + 1;

			const offset = nextSlideIndex * wp(100);

			slideRef.current?.scrollToOffset({ offset });

			setSlideIndex(nextSlideIndex);
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				bounces={false}
				style={styles.container}>
				{/* SLIDE LIST */}
				<FlatList
					ref={slideRef}
					data={onboardingData}
					onMomentumScrollEnd={(e) => updateCSI(e)}
					renderItem={({ item }) => <OnboardingSlide data={item} />}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.flatList}
					bounces={false}
				/>

				{/* BOTTOM CONTENT WRAPPER */}
				<View style={styles.bottonWrapper}>
					{/* INDICATOR WRAPPER */}
					<View style={styles.indicatorWrapper}>
						{onboardingData.map((_, i) => (
							<View
								key={i}
								style={[
									styles.indicator,
									slideIndex === i && {
										backgroundColor: "#24BAEC",
										width: wp(8),
									},
								]}
							/>
						))}
					</View>

					{/* BUTTON WRAPPER */}
					<View style={styles.buttonWrapper}>
						{/* BUTTON */}
						<TouchableOpacity
							onPress={() => nextSlideFunc()}
							activeOpacity={0.5}
							style={styles.button}>
							<Text style={styles.buttonText}>
								{slideIndex === 0 ? "Get Started" : "Next"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatList: {
		width: wp(300),
	},
	bottonWrapper: {
		gap: hp(5),
		marginBottom: hp(5),
		justifyContent: "space-between",
	},
	indicatorWrapper: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: wp(1),
		marginTop: "3%",
	},
	indicator: {
		height: hp(1),
		width: wp(3),
		backgroundColor: "#CAEAFF",
		borderRadius: 10,
	},
	buttonWrapper: {
		width: "100%",
		// marginBottom: "10%",
		// borderWidth: 2,
		paddingHorizontal: wp(5),
	},
	button: {
		width: "100%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#24BAEC",
		paddingVertical: hp(2),
	},
	buttonText: {
		fontSize: hp(2.2),
		fontFamily: "Raleway_SemiBold",
		color: "#fff",
	},
});

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { OnboardingData } from "../../lib/data";
// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextStyles } from "../Shared/Styles";

const OnboardingSlide = ({ data }: { data: OnboardingData }) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: data.imgUrl,
				}}
			/>

			{/* TEXT CONTAINER */}
			<View style={{ marginTop: hp(3), alignItems: "center" }}>
				{/* TITLE */}
				<Text style={TextStyles.title}>{data.title}</Text>

				{/* LOWER TITLE TEXT */}
				<View style={{ flexDirection: "row" }}>
					<Text style={{ ...TextStyles.title, textAlign: "center" }}>
						{data.title2}
					</Text>
					<Text
						style={{
							...TextStyles.title,
							color: "#FF7029",
							textAlign: "center",
						}}>
						{data.span}
					</Text>
				</View>
				{/* TITLE */}
				<Text
					style={{
						...TextStyles.textBase,
						textAlign: "center",
						marginTop: 10,
						paddingHorizontal: wp(4),
						lineHeight: 30,
					}}>
					{data.desc}
				</Text>
			</View>
		</View>
	);
};

export default OnboardingSlide;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: wp(100),
		// borderWidth: 2,
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "70%",
		resizeMode: "stretch",
	},
	textCon: {},
});

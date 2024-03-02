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
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					// @ts-ignore
					source={data.imgUrl}
				/>
			</View>

			{/* TEXT CONTAINER */}
			<View style={{ ...styles.textCon }}>
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
		width: wp(100),
		alignItems: "center",
	},
	imageContainer: {
		width: "100%",
		height: hp(60),
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "stretch",
	},
	textCon: {
		marginTop: hp(3),
		alignItems: "center",
	},
});

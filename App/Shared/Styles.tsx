import { StyleSheet } from "react-native";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const containerStyle = StyleSheet.create({
	container: {
		paddingHorizontal: wp(3),
	},
});

export const TextStyles = StyleSheet.create({
	title: {
		fontSize: hp(3.5),
		fontFamily: "Raleway_800ExtraBold",
		color: "#1B1E28",
	},
	textBase: {
		fontSize: hp(2.2),
		fontFamily: "Raleway_300Light",
	},
});

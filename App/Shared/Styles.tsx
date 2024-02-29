import { StyleSheet } from "react-native";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// CONTAINER STYLES
export const containerStyle = StyleSheet.create({
	container: {
		paddingHorizontal: wp(3),
	},
});

// TEXT STYLES
export const TextStyles = StyleSheet.create({
	title: {
		fontSize: hp(3.5),
		fontFamily: "Raleway_ExtraBold",
		color: "#1B1E28",
	},
	textBase: {
		fontSize: hp(2.2),
		fontFamily: "Raleway_Light",
	},
});

// TEXT INPUT STYLES
export const TextInputStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F7F7F9",
		paddingVertical: hp(2.2),
		paddingHorizontal: hp(2.5),
		borderRadius: 30,
	},
	input: {
		// borderWidth: 1,
		flex: 1,
		backgroundColor: "transparent",
		fontSize: hp(2.2),
		fontFamily: "Raleway_Light",
	},

	otpInputContainer: {
		width: "100%",
		height: hp(8),
		minHeight: 60,
		marginTop: hp(5),
		position: "relative",
		padding: 8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: hp(2),
		// borderWidth: 1,
	},

	otpInput: {
		backgroundColor: "#F7F7F9",
		borderRadius: 10,
		width: hp(7),
		height: hp(7),
		textAlign: "center",
		fontSize: hp(2),
	},

	showHideButton: {
		width: "12%",
		alignItems: "center",
		justifyContent: "center",
		// borderWidth: 1,
	},

	signInButton: {
		width: "100%",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#24BAEC",
		paddingVertical: hp(2),
	},
	signInButtonText: {
		fontSize: hp(2.2),
		fontFamily: "Raleway_SemiBold",
		color: "#fff",
	},
});

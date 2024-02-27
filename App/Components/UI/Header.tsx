import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={{
					uri: "https://raw.githubusercontent.com/Officialibn1/ibnsassets/main/uploads/logo.png",
				}}
			/>

			<TextInput
				style={styles.searchBar}
				placeholder='Search a place. . .'
				placeholderTextColor={"#1939B7"}
			/>

			<Image
				style={styles.profile}
				source={{
					uri: "https://raw.githubusercontent.com/Officialibn1/ibnsassets/main/uploads/user.png",
				}}
			/>
		</View>
	);
};

export default Header;

// STYLES
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: wp(2),
	},
	logo: {
		height: hp(6),
		width: hp(6),
		// borderRadius: hp(5),
	},
	searchBar: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#6690FF",
		fontSize: hp(1.8),
	},
	profile: {
		height: hp(6),
		width: hp(6),
		borderRadius: hp(3),
	},
});

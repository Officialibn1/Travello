import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { TextStyles, containerStyle } from "../App/Shared/Styles";
import { useAppDispatch } from "../App/ReduxHooks";
import { logOut } from "../ReduxApp/features/login/LoginSlice";

const HomeScreen = () => {
	const dispatch = useAppDispatch();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					...containerStyle.container,
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<TouchableOpacity
					onPress={() => dispatch(logOut())}
					style={{ padding: 20, backgroundColor: "#24BAEC", borderRadius: 20 }}>
					<Text style={TextStyles.title}>Log Out</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

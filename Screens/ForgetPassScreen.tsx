import { Ionicons } from "@expo/vector-icons";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Modal,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	TextInputStyles,
	TextStyles,
	containerStyle,
} from "../App/Shared/Styles";

// RESPONSIVE VALUE LIBRARY
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MyStackParamList } from "../typings";

type FormType = {
	email: string;
};

const ForgetPassScreen = () => {
	// MODAL VISIBLE STATE
	const [isModalVisible, setIsModalVisible] = useState(false);

	const toggleModal = () => {
		setIsModalVisible((prev) => !prev);
	};

	// NAVIGATION HOOK
	const navigation = useNavigation<NavigationProp<MyStackParamList>>();

	// REACT HOOK FORM SCHEME
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		defaultValues: {
			email: "",
		},
	});

	const submit = async (data: FormType) => {
		toggleModal();

		await new Promise((resolve) => setTimeout(resolve, 1000));

		navigation.navigate("OTPScreen", { email: data.email });

		await new Promise((resolve) => setTimeout(resolve, 500));

		toggleModal();
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* CONTAINER */}
			<View style={containerStyle.container}>
				<Modal
					animationType='slide'
					transparent={true}
					visible={isModalVisible}
					presentationStyle='overFullScreen'
					onRequestClose={() => {
						setIsModalVisible(!isModalVisible);
					}}>
					<View style={styles.modalBackground}>
						<View style={styles.modalContent}>
							<View style={styles.modalIcon}>
								<Ionicons
									name='mail-open-outline'
									size={30}
									color='#fff'
								/>
							</View>
							<Text
								style={{
									...TextStyles.title,
									marginBottom: hp(2),
									textAlign: "center",
								}}>
								Check your email
							</Text>
							<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
								We have send password recovery instruction to your email{" "}
							</Text>
						</View>
					</View>
				</Modal>

				{/* TEXT CONTAINER */}
				<View style={styles.headerTextContainer}>
					{/* TITLE */}
					<Text style={TextStyles.title}>Forgot password</Text>
					{/* SUB TITLE */}
					<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
						Enter your email account to reset your password{" "}
					</Text>
				</View>

				{/* FORM CONTAINER */}
				<View style={styles.formContainer}>
					{/* EMAIL CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
								message: "Invalid email address",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={TextInputStyles.container}>
								<TextInput
									style={TextInputStyles.input}
									placeholder='example@example.com'
									placeholderTextColor={"#000"}
									onChangeText={onChange}
									autoCapitalize='none'
									onBlur={onBlur}
									value={value}
								/>
							</View>
						)}
						name='email'
					/>
					{errors.email && (
						<Text style={styles.errorStyle}>
							{!errors.email.message
								? "Email is Required"
								: errors.email?.message}
						</Text>
					)}

					{/* FORGET PASSWORD */}
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						activeOpacity={0.5}
						style={{ width: "auto", marginLeft: "auto" }}>
						<Text style={styles.forgetPasswordText}>Back to Login</Text>
					</TouchableOpacity>

					{/* SUBMIT BUTTON CONTAINER */}
					<TouchableOpacity
						onPress={handleSubmit(submit)}
						activeOpacity={0.5}
						style={{ ...TextInputStyles.signInButton, marginTop: hp(4) }}>
						<Text style={TextInputStyles.signInButtonText}>Reset Password</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ForgetPassScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	headerTextContainer: {
		alignItems: "center",
		gap: hp(1.5),
		marginTop: hp(4.5),
	},
	formContainer: {
		paddingHorizontal: wp(2),
		marginTop: hp(5),
		gap: hp(2),
	},
	forgetPasswordText: {
		fontSize: hp(1.8),
		fontFamily: "Raleway_Medium",
		textAlign: "left",
		color: "#FF7029",
	},
	socialContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: wp(5),
		marginTop: hp(10),
	},
	socialIcon: {
		// padding: hp(2),
		borderRadius: hp(4),
		width: hp(7),
		height: hp(7),
		// borderWidth: 2,
		// borderColor: "#707B81",
		alignItems: "center",
		justifyContent: "center",
	},
	errorStyle: {
		fontFamily: "Raleway_Light",
		color: "#FF7029",
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black
		alignItems: "center",
		justifyContent: "center",
	},

	modalContent: {
		backgroundColor: "white",
		paddingVertical: hp(5),
		paddingHorizontal: hp(3),
		borderRadius: 30,
		elevation: 5, // shadow for modal content
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.3,
		shadowRadius: 30,
		alignSelf: "center",
	},
	modalIcon: {
		width: hp(6),
		height: hp(6),
		borderRadius: hp(4),
		backgroundColor: "#FF7029",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: hp(3),
		alignSelf: "center",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 10,
	},
});

import { Ionicons, Feather } from "@expo/vector-icons";
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
	password: string;
	confirmPassword: string;
};

const NewPasswordScreen = () => {
	// MODAL VISIBLE STATE
	const [isModalVisible, setIsModalVisible] = useState(false);

	// PASSWORD VISIBLE STATE
	const [showPassword, setShowPassword] = useState(false);

	const [confirmPass, setConfirmPass] = useState(false);

	const toggleModal = () => {
		setIsModalVisible((prev) => !prev);
	};

	// NAVIGATION HOOK
	const navigation = useNavigation<NavigationProp<MyStackParamList>>();

	// REACT HOOK FORM SCHEME
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormType>({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const submit = async (data: FormType) => {
		if (data.confirmPassword !== data.password) {
			setConfirmPass(true);

			return;
		}
		setConfirmPass(false);

		toggleModal();

		await new Promise((resolve) => setTimeout(resolve, 1000));

		navigation.reset({
			index: 0,
			routes: [{ name: "LoginScreen" as never }],
		});

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
									name='checkmark-done'
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
								Password Changed
							</Text>
							<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
								Your password have been changed successfully{" "}
							</Text>
						</View>
					</View>
				</Modal>

				{/* TEXT CONTAINER */}
				<View style={styles.headerTextContainer}>
					{/* TITLE */}
					<Text style={TextStyles.title}>Reset password</Text>
					{/* SUB TITLE */}
					<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
						Create a new password for your account{" "}
					</Text>
				</View>

				{/* FORM CONTAINER */}
				<View style={styles.formContainer}>
					{/* EMAIL CONTAINER */}
					{/* PASSWORD CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
								message: "Password must meet all requirements!",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={TextInputStyles.container}>
								<TextInput
									style={TextInputStyles.input}
									placeholder='Enter Password'
									secureTextEntry={showPassword}
									placeholderTextColor={"#000"}
									autoCapitalize='none'
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>

								<TouchableOpacity
									style={TextInputStyles.showHideButton}
									onPress={() => setShowPassword((prev) => !prev)}>
									<Feather
										name={!showPassword ? "eye-off" : "eye"}
										size={24}
										color='black'
									/>
								</TouchableOpacity>
							</View>
						)}
						name='password'
					/>

					{errors.password && (
						<Text style={styles.errorStyle}>
							{!errors.password.message
								? "Enter your password!"
								: errors.password?.message}
						</Text>
					)}

					{/* PASSWORD CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
								message: "Password must meet all requirements!",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={TextInputStyles.container}>
								<TextInput
									style={TextInputStyles.input}
									placeholder='Confirm Password'
									secureTextEntry={showPassword}
									placeholderTextColor={"#000"}
									autoCapitalize='none'
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>

								<TouchableOpacity
									style={TextInputStyles.showHideButton}
									onPress={() => setShowPassword((prev) => !prev)}>
									<Feather
										name={!showPassword ? "eye-off" : "eye"}
										size={24}
										color='black'
									/>
								</TouchableOpacity>
							</View>
						)}
						name='confirmPassword'
					/>
					{errors.confirmPassword && (
						<Text style={styles.errorStyle}>
							{!errors.confirmPassword.message
								? "Confirm your password!"
								: errors.confirmPassword?.message}
						</Text>
					)}

					{confirmPass && (
						<Text style={styles.errorStyle}>
							{confirmPass ? "Confirm password must match your password!" : ""}
						</Text>
					)}

					{/* PASSWORD REQUIREMENTS */}
					<View style={{ gap: 5 }}>
						<Text style={{ fontFamily: "Raleway_Light" }}>
							Password must be 8 characters
						</Text>
						<Text style={{ fontFamily: "Raleway_Light" }}>
							Password muct contain a number and Capital letter
						</Text>
						<Text style={{ fontFamily: "Raleway_Light" }}>
							Password must contain special character
						</Text>
					</View>

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

export default NewPasswordScreen;

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

import {
	FontAwesome,
	FontAwesome6,
	Feather,
	Ionicons,
} from "@expo/vector-icons";
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
import { useNavigation } from "@react-navigation/native";
import { validLogins } from "../lib/data";

type FormType = {
	email: string;
	password: string;
};

const LoginScreen = () => {
	// PASSWORD VISIBLE STATE
	const [showPassword, setShowPassword] = useState(false);

	// INVALID MODAL STATE
	const [isInvalidVisible, setIsInvalidVisible] = useState(false);

	// INVALID MODAL STATE
	const [isModalVisible, setIsModalVisible] = useState(false);

	// NAVIGATION HOOK
	const navigation = useNavigation();

	// REACT HOOK FORM SCHEME
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submit = async (data: FormType) => {
		// CREATE A MOCK DELAY

		await new Promise((resolve) => setTimeout(resolve, 1500));

		// GET A USER FROM THE DUMMY DATA USING THE INPUTED EMAIL
		const user = validLogins.find((user) => user.email === data.email);

		// CHECK IS THERE IS A USER AND IF THE PASSWORD PROVIDED MATCHED THE PASSWORD
		if (!user || user?.password !== data.password) {
			// SET THE INVALID MODAL TO TRUE
			setIsInvalidVisible(true);

			// CREATE A MOCK DELAY
			await new Promise((resolve) => setTimeout(resolve, 1800));

			// SET THE INVALID MODAL TO FALSE
			setIsInvalidVisible(false);

			return;
		}

		// SET THE SUCCESSFUL LOGIN MODAL TO TRUE
		setIsModalVisible(true);

		// CREATE A MOCK DELAY
		await new Promise((resolve) => setTimeout(resolve, 1800));

		// SET THE SUCCESSFUL LOGIN MODAL TO FALSE
		setIsModalVisible(false);

		return;
	};

	useEffect(() => {
		AsyncStorage.setItem("appLaunched", "launched");
	}, []);

	const clear = () => {
		AsyncStorage.removeItem("appLaunched");
	};
	return (
		<SafeAreaView style={styles.container}>
			{/* CONTAINER */}
			<View style={containerStyle.container}>
				{/* TEXT CONTAINER */}
				<View style={styles.headerTextContainer}>
					{/* TITLE */}
					<Text style={TextStyles.title}>Sign in now</Text>
					{/* SUB TITLE */}
					<Text style={TextStyles.textBase}>
						Please sign in to continue our app
					</Text>
				</View>

				{/* INVALID CREDENTIALS MODAL */}
				<Modal
					animationType='slide'
					transparent={true}
					visible={isInvalidVisible}
					presentationStyle='overFullScreen'
					onRequestClose={() => {
						setIsInvalidVisible(!isInvalidVisible);
					}}>
					<View style={styles.modalBackground}>
						<View style={styles.modalContent}>
							<View style={styles.modalIcon}>
								<Feather
									name='x'
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
								Invalid Credentials
							</Text>
							<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
								The credentials you provided are invalid!{" "}
							</Text>
						</View>
					</View>
				</Modal>

				{/* SUCCESSFUL CREDENTIALS MODAL */}
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
							<View style={{ ...styles.modalIcon, backgroundColor: "#19B000" }}>
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
								Login Successful
							</Text>
							<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
								You have successfully Logged-In
							</Text>
						</View>
					</View>
				</Modal>

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
									autoCapitalize='none'
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
							</View>
						)}
						name='email'
					/>
					{errors.email && (
						<Text style={styles.errorStyle}>
							{!errors.email?.message
								? "Email is Required"
								: errors.email.message}
						</Text>
					)}

					{/* PASSWORD CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
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
						<Text style={styles.errorStyle}>Password is required</Text>
					)}

					{/* FORGET PASSWORD */}
					<TouchableOpacity
						onPress={() => navigation.navigate("ForgetPassScreen" as never)}
						activeOpacity={0.5}
						style={{ width: "auto", marginLeft: "auto" }}>
						<Text style={styles.forgetPasswordText}>Forgot Password?</Text>
					</TouchableOpacity>

					{/* SUBMIT BUTTON CONTAINER */}
					<TouchableOpacity
						onPress={handleSubmit(submit)}
						activeOpacity={0.5}
						style={{ ...TextInputStyles.signInButton, marginTop: hp(4) }}>
						<Text style={TextInputStyles.signInButtonText}>Sign In</Text>
					</TouchableOpacity>

					{/* SIGNUP PAGE LINK CONTAINER */}
					<View style={styles.headerTextContainer}>
						{/* SUB TITLE */}

						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={TextStyles.textBase}>Don't have an account?</Text>
							<Text
								onPress={() => navigation.navigate("SignupScreen" as never)}
								style={{
									...TextStyles.textBase,
									color: "#FF7029",
									fontFamily: "Raleway_Medium",
								}}>
								{" "}
								Sign up
							</Text>
						</View>
						{/* SUB TITLE */}
						<Text style={TextStyles.textBase}>Or connect</Text>
					</View>
				</View>

				{/* SOCAIL ICON CONTAINER  */}
				<View style={styles.socialContainer}>
					{/* FACEBOOK */}
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ ...styles.socialIcon, backgroundColor: "#F7F7F9" }}>
						<FontAwesome
							name='facebook'
							size={40}
							color='#1877F2'
						/>
					</TouchableOpacity>

					{/* INSTAGRAM */}
					<TouchableOpacity
						onPress={() => clear()}
						activeOpacity={0.5}
						style={{ ...styles.socialIcon, backgroundColor: "#F7F7F9" }}>
						<FontAwesome
							name='instagram'
							size={40}
							color='#F50000'
						/>
					</TouchableOpacity>

					{/* TWITTER */}
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ ...styles.socialIcon, backgroundColor: "#F7F7F9" }}>
						<FontAwesome6
							name='x-twitter'
							size={40}
							color='#03A9F4'
						/>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;

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

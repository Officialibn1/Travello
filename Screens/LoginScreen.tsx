import { FontAwesome, FontAwesome6, Feather } from "@expo/vector-icons";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Touchable,
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

type FormType = {
	email: string;
	password: string;
};

const LoginScreen = () => {
	// PASSWORD VISIBLE STATE
	const [showPassword, setShowPassword] = useState(false);

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

	const submit = (data: any) => {
		console.log(data);
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

				{/* FORM CONTAINER */}
				<View style={styles.formContainer}>
					{/* EMAIL CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
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
									onBlur={onBlur}
									value={value}
								/>
							</View>
						)}
						name='email'
					/>
					{errors.email && (
						<Text style={styles.errorStyle}>{errors.email.message}</Text>
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
					{/* <View style={TextInputStyles.container}>
						<TextInput
							style={TextInputStyles.input}
							placeholder='Enter Password'
							secureTextEntry={showPassword}
							placeholderTextColor={"#000"}
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
					</View> */}

					{/* FORGET PASSWORD */}
					<TouchableOpacity
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
});

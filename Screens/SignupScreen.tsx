import { FontAwesome, FontAwesome6, Feather } from "@expo/vector-icons";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	TextInput,
	ScrollView,
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

type FormType = {
	name: string;
	email: string;
	password: string;
};

const SignupScreen = () => {
	// PASSWORD VISIBLE STATE
	const [showPassword, setShowPassword] = useState(false);

	// NAVIGATION HOOK
	const navigation = useNavigation();

	// REACT HOOK FORM SCHEME
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const submit = (data: any) => {
		console.log(data);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* CONTAINER */}
			<ScrollView style={containerStyle.container}>
				{/* TEXT CONTAINER */}
				<View style={styles.headerTextContainer}>
					{/* TITLE */}
					<Text style={TextStyles.title}>Sign up now</Text>
					{/* SUB TITLE */}
					<Text style={TextStyles.textBase}>
						Please fill the details and create account
					</Text>
				</View>

				{/* FORM CONTAINER */}
				<View style={styles.formContainer}>
					{/* NAME CONTAINER */}
					<Controller
						// @ts-ignore
						control={control}
						rules={{
							required: true,
							minLength: 6,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={TextInputStyles.container}>
								<TextInput
									style={TextInputStyles.input}
									placeholder='John Doe'
									placeholderTextColor={"#000"}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
							</View>
						)}
						name='name'
					/>
					{errors.name && (
						<Text style={styles.errorStyle}>Full Name is required</Text>
					)}
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
								? "Email is required!"
								: errors.email?.message}
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
								? "Password is required!"
								: errors.password?.message}
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

					{/* SUBMIT BUTTON CONTAINER */}
					<TouchableOpacity
						onPress={handleSubmit(submit)}
						activeOpacity={0.5}
						style={{ ...TextInputStyles.signInButton, marginTop: hp(2) }}>
						<Text style={TextInputStyles.signInButtonText}>Sign Up</Text>
					</TouchableOpacity>

					{/* SIGNUP PAGE LINK CONTAINER */}
					<View style={{ ...styles.headerTextContainer, marginTop: hp(2.5) }}>
						{/* SUB TITLE */}

						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={TextStyles.textBase}>Already have an account?</Text>
							<Text
								onPress={() => navigation.goBack()}
								style={{
									...TextStyles.textBase,
									color: "#FF7029",
									fontFamily: "Raleway_Medium",
								}}>
								{" "}
								Sign In
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignupScreen;

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
		marginTop: hp(6),
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

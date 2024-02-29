import { Ionicons } from "@expo/vector-icons";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Modal,
	Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MyStackParamList } from "../typings";
import { useGestureHandlerRef } from "@react-navigation/stack";

type FormType = {
	email: string;
};

const OTPScreen = () => {
	// MODAL VISIBLE STATE
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [error, setError] = useState(false);

	// OTP INPUT REFS
	const inputRefs: React.MutableRefObject<TextInput | null>[] = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	// OTP INOUT STATE
	const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

	const isTextInput = (
		ref: React.RefObject<any>,
	): ref is React.RefObject<TextInput> => {
		return (ref.current as TextInput) !== null;
	};

	const handleChange = (text: string, index: number) => {
		const sanitizedText = text.replace(/[^0-9]/g, "");

		const newOtp = [...otp];

		newOtp[index] = text;

		setOtp(newOtp);

		if (sanitizedText && index < otp.length - 1) {
			// Check if ref holds a TextInput before accessing focus
			if (isTextInput(inputRefs[index])) {
				inputRefs[index + 1].current?.focus();
			}
		}

		if (
			!sanitizedText &&
			index > 0 &&
			!text &&
			!inputRefs[index - 1].current?.isFocused()
		) {
			inputRefs[index - 1].current?.focus();
		}
		// handleNext(index);
		// handlePrevious(index);
	};

	const toggleModal = () => {
		setIsModalVisible((prev) => !prev);
	};

	const {
		// @ts-ignore
		params: { email },
	} = useRoute<RouteProp<MyStackParamList>>();

	// NAVIGATION HOOK
	const navigation = useNavigation();

	const submit = async () => {
		if (
			otp[0].length < 1 ||
			otp[1].length < 1 ||
			otp[2].length < 1 ||
			otp[3].length < 1
		) {
			setError(true);

			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		toggleModal();

		navigation.navigate("NewPasswordScreen" as never);

		await new Promise((resolve) => setTimeout(resolve, 500));

		toggleModal();

		setError(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* CONTAINER */}
			<View style={containerStyle.container}>
				{/* OTP MODAL */}
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
								Successful
							</Text>
							<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
								Your OTP is verified successfully{" "}
							</Text>
						</View>
					</View>
				</Modal>

				{/* TEXT CONTAINER */}
				<View style={styles.headerTextContainer}>
					{/* TITLE */}
					<Text style={TextStyles.title}>OTP Verification</Text>
					{/* SUB TITLE */}
					<Text style={{ ...TextStyles.textBase, textAlign: "center" }}>
						Please check your email {email ? email : ""} to see the verification
						code{" "}
					</Text>
				</View>

				{/* FORM CONTAINER */}
				<View style={styles.formContainer}>
					{/* EMAIL CONTAINER */}

					<View style={TextInputStyles.otpInputContainer}>
						{otp.map((item, i) => (
							<TextInput
								key={i}
								ref={inputRefs[i]}
								style={TextInputStyles.otpInput}
								// placeholder='example@example.com'
								placeholderTextColor={"#000"}
								onChangeText={(text) => handleChange(text, i)}
								autoCapitalize='none'
								value={otp[i]}
								maxLength={1}
								selectTextOnFocus={true}
							/>
						))}
					</View>

					{error && <Text style={styles.errorStyle}>All OTP are Required</Text>}

					{/* FORGET PASSWORD */}
					<TouchableOpacity
						// onPress={() => navigation.goBack()}
						activeOpacity={0.5}
						style={{ width: "auto", marginLeft: "auto" }}>
						<Text style={styles.forgetPasswordText}>Resend OTP</Text>
					</TouchableOpacity>

					{/* SUBMIT BUTTON CONTAINER */}
					<TouchableOpacity
						// onPress={handleSubmit(submit)}
						activeOpacity={0.5}
						onPressIn={() => submit()}
						style={{ ...TextInputStyles.signInButton, marginTop: hp(4) }}>
						<Text style={TextInputStyles.signInButtonText}>Verify</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default OTPScreen;

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

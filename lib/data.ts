export type OnboardingData = {
	id: string;
	imgUrl: string;
	title: string;
	title2: string;
	span: string;
	desc: string;
};

export const onboardingData: OnboardingData[] = [
	{
		id: "23kqe",
		imgUrl: require("../assets/onboarding1.png"),
		title: "Life is short and the",
		title2: "world is ",
		span: "wide",
		desc: "At Friends tours and travel, we customize reliable and trutworthy educational tours to destinations all over the world",
	},
	{
		id: "xwee23",
		imgUrl: require("../assets/onboarding2.png"),
		title: "It’s a big world out",
		title2: "there go ",

		span: "explore",
		desc: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
	},
	{
		id: "xw342frv",
		imgUrl: require("../assets/onboarding3.png"),
		title: "People don’t take trips,",
		title2: "trips take ",

		span: "people",
		desc: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
	},
];

type ValidLogins = { email: string; password: string };
// VALID LOGINS
export const validLogins: ValidLogins[] = [
	{
		email: "ibn@ibn.com",
		password: "12@Ab12345",
	},
	{
		email: "ibn@gmail.com",
		password: "12@Ab12345",
	},
	{
		email: "john@gmail.com",
		password: "12@Ab12345",
	},
];

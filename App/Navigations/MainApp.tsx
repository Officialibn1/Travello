import {
	MaterialCommunityIcons,
	AntDesign,
	FontAwesome6,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../Screens/HomeScreen";
import ProfileScreen from "../../Screens/ProfileScreen";
import SearchScreen from "../../Screens/SearchScreen";
import MessagesScreen from "../../Screens/MessagesScreen";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import CallenderScreen from "../../Screens/CallenderScreen";

const Tab = createBottomTabNavigator();

const MainApp = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#3366FF",
				tabBarBackground: () => (
					<BlurView
						tint='extraLight'
						intensity={100}
						style={{
							backgroundColor: "transparent",
							width: "100%",
							height: "100%",
						}}
					/>
				),
			}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='home'
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Callender'
				component={CallenderScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='calendar'
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={SearchScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='search1'
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Messages'
				component={MessagesScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='message1'
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesome6
							name='user'
							size={30}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default MainApp;

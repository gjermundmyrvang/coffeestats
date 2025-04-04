import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Homescreen from "./screens/Homescreen";
import Loggingscreen from "./screens/Loggingscreen";
import Onboarding from "./screens/Onboarding";
import Profilescreen from "./screens/Profilescreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Log") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarActiveTintColor: "#1D1D1D",
        tabBarInactiveTintColor: "#6C6C6C",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Log"
        component={Loggingscreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboarded = await AsyncStorage.getItem("onboarding");
        setIsOnboarded(onboarded === "1");
      } catch (error) {
        console.error("Error loading onboarding status", error);
        setIsOnboarded(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={isOnboarded ? "StartPage" : "Onboarding"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartPage" component={TabNavigator} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

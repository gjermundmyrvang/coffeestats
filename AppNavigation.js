import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Onboarding from "./screens/Onboarding";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "./screens/Homescreen";
import Loggingscreen from "./screens/Loggingscreen";
import Profilescreen from "./screens/Profilescreen";
import { Ionicons } from "@expo/vector-icons";
import { STORAGEKEYS } from "./constants/AsyncKeys";
import { Settingsscreen } from "./screens/Settingsscreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      options={{ headerShown: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "home") {
            iconName = "home-sharp";
          } else if (route.name === "logs") {
            iconName = "stats-chart-sharp";
          } else if (route.name === "profile") {
            iconName = "person-sharp";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1d1d1d",
        tabBarInactiveTintColor: "#cacaca",
        tabBarStyle: {
          backgroundColor: "#fafafa",
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        name="home"
        options={{ headerShown: false }}
        component={Homescreen}
      />
      <Tab.Screen
        name="logs"
        options={{ headerShown: false }}
        component={Loggingscreen}
      />
      <Tab.Screen
        name="profile"
        options={{ headerShown: false }}
        component={Profilescreen}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const [isOnboarded, setisOnboarded] = useState(null);
  useEffect(() => {
    checkIfOnboarded();
  }, []);

  const checkIfOnboarded = async () => {
    let onboarded = await AsyncStorage.getItem(STORAGEKEYS.ONBOARDING);
    onboarded == 1 ? setisOnboarded(true) : setisOnboarded(false);
  };

  const handleOnboarded = () => {
    setisOnboarded(true);
  };

  if (isOnboarded == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Something went wrong when starting the app. Try restarting the app.
        </Text>
      </View>
    );
  }
  if (!isOnboarded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="onboarding">
          <Stack.Screen name="onboarding" options={{ headerShown: false }}>
            {(props) => <Onboarding {...props} onComplete={handleOnboarded} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="main"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: false }}
          component={Settingsscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

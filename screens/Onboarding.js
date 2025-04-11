import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "../components/MyButton";
import { STORAGEKEYS } from "../constants/AsyncKeys";
import { ProfileContext } from "../context/ProfileContext";

export default function Onboarding({ onComplete }) {
  const { setProfile } = useContext(ProfileContext);
  const [localProfile, setLocalProfile] = useState({
    name: "",
    points: "1",
    favCoffee: "",
    favTreat: "",
  });

  const handleChange = (key, value) => {
    setLocalProfile({ ...localProfile, [key]: value });
  };

  const isValidInput = () => {
    const { name, favCoffee, favTreat } = localProfile;
    if (!name.trim() || !favCoffee || !favTreat.trim()) {
      Alert.alert("Fill out every field!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValidInput()) return;
    try {
      await AsyncStorage.setItem(STORAGEKEYS.ONBOARDING, "1");
      await AsyncStorage.setItem(
        STORAGEKEYS.PROFILE,
        JSON.stringify(localProfile)
      );
      setProfile(localProfile); // updates global context
      console.log("Profile submitted:", localProfile);
      onComplete();
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(
        "An error occurred while saving your profile. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Coffee Stats</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-add-sharp"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={localProfile.name}
          clearButtonMode="while-editing"
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="cafe-sharp"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite coffee"
          value={localProfile.favCoffee}
          clearButtonMode="while-editing"
          onChangeText={(text) => handleChange("favCoffee", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="ice-cream-sharp"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite coffee treat"
          value={localProfile.favTreat}
          clearButtonMode="while-editing"
          onChangeText={(text) => handleChange("favTreat", text)}
        />
      </View>
      <MyButton onPress={handleSubmit} icon={"bookmark-sharp"} text={"Save"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    width: 25,
    textAlign: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

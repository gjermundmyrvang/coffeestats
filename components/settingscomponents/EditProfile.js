import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { STORAGEKEYS } from "../../constants/AsyncKeys";
import MyButton from "../MyButton";
import { ProfileContext } from "../../context/ProfileContext";

export default function EditProfile({ onComplete }) {
  const { profile, setProfile, loading } = useContext(ProfileContext);

  const isValidInput = () => {
    const { name, favCoffee, favTreat } = profile;
    if (!name.trim() || !favCoffee || !favTreat.trim()) {
      Alert.alert("Fill out every field!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValidInput()) return;
    try {
      const savedProfile = JSON.stringify(profile);
      if (savedProfile) {
        await AsyncStorage.setItem(STORAGEKEYS.PROFILE, savedProfile);
        console.log("Profile changed:", savedProfile);
        onComplete();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(
        "An error occurred while saving your profile. Please try again."
      );
    }
  };

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
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
          value={profile.name}
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
          value={profile.favCoffee}
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
          value={profile.favTreat}
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
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#1d1d1d",
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGEKEYS } from "../../constants/AsyncKeys";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [profile, setProfile] = useState({
    name: "",
    birth: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(STORAGEKEYS.PROFILE);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      setLoading(false);
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  };
  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };
  const isValidInput = () => {
    const { name, birth, height, weight } = profile;
    if (!name.trim() || !birth || !height.trim() || !weight.trim()) {
      Alert.alert("Fill out every field!");
      return false;
    }
    return true;
  };

  const onComplete = () => {
    Alert.alert(
      "Profile updated. Note that name will not change in homescreen until you restart the app."
    );
  };
  const handleSubmit = async () => {
    if (!isValidInput()) return;
    try {
      const savedProfile = JSON.stringify(profile);
      if (savedProfile) {
        await AsyncStorage.setItem(STORAGEKEYS.PROFILE, savedProfile);
        console.log("Profile submitted:", savedProfile);
        onComplete();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(
        "An error occurred while saving your profile. Please try again."
      );
    }
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

      <TextInput
        placeholder="Name"
        value={profile.name}
        clearButtonMode="while-editing"
        onChangeText={(text) => handleChange("name", text)}
        style={styles.input}
      />
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        style={styles.dateInput}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            const parsed = selectedDate.toDateString();
            handleChange("birth", parsed);
            setDate(selectedDate);
          } else {
            console.error("No date selected");
          }
        }}
      />
      <TextInput
        placeholder="Height (cm)"
        value={profile.height}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("height", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Weight (kg)"
        value={profile.weight}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("weight", text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1d1d1d",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Onboarding() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [profile, setProfile] = useState({
    name: "",
    birth: "",
    height: "",
    weight: "",
    points: "1",
  });
  const navigation = useNavigation();

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

  const handleSubmit = async () => {
    if (!isValidInput()) return;
    try {
      const savedProfile = JSON.stringify(profile);
      await AsyncStorage.setItem("onboarding", "1");
      await AsyncStorage.setItem("profile", savedProfile);
      console.log("Profile submitted:", savedProfile);
      navigation.navigate("StartPage");
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
        <FontAwesome5 name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={profile.name}
          clearButtonMode="while-editing"
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="calendar"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <Text style={[styles.input && { color: "gray" }]}>
          {profile.birth == "" ? "Enter your birthdate" : profile.birth}
        </Text>
        <DateTimePicker
          value={date}
          style={styles.input}
          mode="date"
          display="default"
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
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="ruler" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your height (cm)"
          keyboardType="numeric"
          returnKeyType="done"
          clearButtonMode="while-editing"
          value={profile.height}
          onChangeText={(text) => handleChange("height", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="weight"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          returnKeyType="done"
          clearButtonMode="while-editing"
          value={profile.weight}
          onChangeText={(text) => handleChange("weight", text)}
        />
      </View>
      <Button title="Save" onPress={handleSubmit} />
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

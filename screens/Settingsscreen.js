import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Updates from "expo-updates";

export const Settingsscreen = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.goBack();
  };

  const deleteAllData = async () => {
    Alert.alert(
      "Are you sure?",
      "This will delete all saved data and restart the app.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              await Updates.reloadAsync();
            } catch (err) {
              console.error("Failed to clear data or restart app:", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigate}>
        <Ionicons name="chevron-back" size={26} color="#1d1d1d" />
      </TouchableOpacity>
      <Text style={styles.headertext}>Settings</Text>

      <ScrollView contentContainerStyle={styles.settingsList}>
        <DeleteDataButton onPress={deleteAllData} />
      </ScrollView>
    </View>
  );
};

const DeleteDataButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons
          name="trash-outline"
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.text}>Delete All Saved Data</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 60,
    paddingHorizontal: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    padding: 10,
    top: 55,
    left: 15,
    zIndex: 10,
  },
  headertext: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#1d1d1d",
  },
  settingsList: {
    paddingBottom: 40,
  },
  settingItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

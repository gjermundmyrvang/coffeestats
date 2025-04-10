import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Updates from "expo-updates";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GenericModal } from "../components/GenericModal";
import Credits from "../components/settingscomponents/Credits";
import EditProfile from "../components/settingscomponents/EditProfile";
import { STORAGEKEYS } from "../constants/AsyncKeys";

export const Settingsscreen = () => {
  const [showModal, setshowModal] = useState(false);
  const [child, setChild] = useState(null);

  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.goBack();
  };

  const closeModal = () => {
    setshowModal(false);
  };

  const openModal = (component) => {
    setChild(component);
    setshowModal(true);
  };

  const deleteAllData = async (type = "all") => {
    Alert.alert(
      "Are you sure?",
      `This will delete ${type} data and restart the app.`,
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
              switch (type) {
                case "history":
                  await AsyncStorage.removeItem(STORAGEKEYS.ENTRIES);
                  break;
                case "onboarding":
                  await AsyncStorage.removeItem(STORAGEKEYS.ONBOARDING);
                  break;
                default:
                  await AsyncStorage.clear();
              }
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
        <Text style={styles.h2}>General</Text>
        <View style={styles.settingItems}>
          <SettingsItem
            icon={"person-outline"}
            text={"Edit profile"}
            onClick={() => openModal(<EditProfile />)}
          />
          <SettingsItem
            icon={"shield-checkmark-outline"}
            text={"Credits"}
            onClick={() => openModal(<Credits />)}
          />
        </View>
        <Text style={styles.h2}>Data</Text>
        <View style={styles.settingItems}>
          <SettingsItem
            icon={"trash-outline"}
            text={"Delete All Saved Data"}
            onClick={() => deleteAllData("all")}
          />
          <SettingsItem
            icon={"trash-bin-outline"}
            text={"Delete Coffee History"}
            onClick={() => deleteAllData("history")}
          />
          <SettingsItem
            icon={"sync-outline"}
            text={"Reset Onboarding"}
            onClick={() => deleteAllData("onbaording")}
          />
        </View>
      </ScrollView>
      {showModal && (
        <GenericModal visible={showModal} onClose={closeModal}>
          {child}
        </GenericModal>
      )}
    </View>
  );
};

const SettingsItem = ({ icon, text, onClick }) => {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onClick}>
      <Ionicons name={icon} size={22} color={"#1d1d1d"} />
      <Text style={styles.settingText}>{text}</Text>
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
  h2: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 5,
    color: "#1d1d1d",
  },
  settingsList: {
    paddingBottom: 40,
  },
  settingItems: {
    marginVertical: 10,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
  },
  settingsItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 6,
    borderBottomColor: "#fafafa",
    borderBottomWidth: 2,
  },
  settingText: {
    fontSize: 16,
    color: "#1d1d1d",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
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

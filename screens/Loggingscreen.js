import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import History from "../components/History";
import Stats from "../components/Stats";
import { STORAGEKEYS } from "../constants/AsyncKeys";

export default function Loggingscreen() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState("history");

  useFocusEffect(
    useCallback(() => {
      loadCoffeeLogs();
    }, [])
  );

  const loadCoffeeLogs = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGEKEYS.ENTRIES);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setEntries(parsed);
      }
    } catch (error) {
      setEntries([]);
      console.log("Failed retrieving coffee entries", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            view === "history" && styles.activeButton,
          ]}
          onPress={() => setView("history")}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, view === "stats" && styles.activeButton]}
          onPress={() => setView("stats")}
        >
          <Text style={styles.buttonText}>Stats</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering */}
      {view === "history" ? (
        <History entries={entries} />
      ) : (
        <Stats entries={entries} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#ADADAD",
  },
  activeButton: {
    backgroundColor: "#FFBA6C",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

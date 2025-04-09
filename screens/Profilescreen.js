import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BuyMeCoffee } from "../components/BuyMeCoffee";
import LevelCard from "../components/LevelCard";
import { levelsdata } from "../data/levels";
import { STORAGEKEYS } from "../constants/AsyncKeys";

const levels = levelsdata;

export default function Profilescreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(STORAGEKEYS.PROFILE);
      const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;
      setProfile(parsedProfile);
      setLoading(false);
      loadLevel(parsedProfile);
    } catch (error) {
      console.error("Error loading profile:", error);
      setError("Failed to load profile.");
      setLoading(false);
    }
  };

  const loadLevel = (profile) => {
    let currentLevel = levels[0];
    let nextLevel = levels[1];

    if (!profile) {
      setLevel({
        currentLevel,
        nextLevel,
        progress: 1,
      });
      return;
    }

    const score = Number(profile.points) || 0;
    console.log("Score:", score);

    for (let i = levels.length - 1; i >= 0; i--) {
      if (score >= levels[i].minScore) {
        currentLevel = levels[i];
        nextLevel = levels[i + 1] || null;
        break;
      }
    }

    const progress = nextLevel
      ? (score - currentLevel.minScore) /
        (nextLevel.minScore - currentLevel.minScore)
      : 1;

    console.log("Progress:", progress);
    setLevel({ currentLevel, nextLevel, progress });
  };

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.name}>{profile?.name || "Unknown"}</Text>
          <Text style={styles.info}>Birth: {profile?.birth || "N/A"}</Text>
          <Text style={styles.info}>Height: {profile?.height || "N/A"} cm</Text>
          <Text style={styles.info}>Weight: {profile?.weight || "N/A"} kg</Text>
        </View>
        <LevelCard level={level} points={profile.points} />
        <BuyMeCoffee />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
    maxWidth: 400,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

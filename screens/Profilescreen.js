import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const levels = [
  { name: "Caffeine Novice ☕", minScore: 0 },
  { name: "Bean Explorer 🌍", minScore: 100 },
  { name: "Aroma Connoisseur 🧐", minScore: 300 },
  { name: "Brewing Virtuoso 🎼", minScore: 600 },
  { name: "Espresso Alchemist ⚗️", minScore: 1000 },
  { name: "Caffeine Strategist 🏆", minScore: 1500 }, // Level 6
  { name: "Latte Visionary 🌟", minScore: 2100 },
  { name: "Barista Grandmaster 🧠", minScore: 2800 },
  { name: "Caffeine Overlord 👑", minScore: 3600 },
  { name: "The Immutable Brewlord 💀", minScore: 4500 },
];

export default function Loggingscreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem("profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      setLoading(false);
    };
    loadProfile();
  }, []);

  const getUserLevel = (score) => {
    let currentLevel = levels[0];
    let nextLevel = levels[1];

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

    return { currentLevel, nextLevel, progress };
  };

  const userScore = 1600; // Dette hentes senere fra AsyncStorage
  const { currentLevel, nextLevel, progress } = getUserLevel(userScore);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.name}>{profile?.name || "Unknown"}</Text>
          <Text style={styles.info}>🎂 Birth: {profile?.birth || "N/A"}</Text>
          <Text style={styles.info}>
            📏 Height: {profile?.height || "N/A"} cm
          </Text>
          <Text style={styles.info}>
            ⚖️ Weight: {profile?.weight || "N/A"} kg
          </Text>
        </View>
        <View style={styles.levelCard}>
          <Text style={styles.levelTitle}>☕ Coffee Rank</Text>
          <Text style={styles.levelText}>{currentLevel.name}</Text>
          <Text style={styles.scoreText}>
            Score: {userScore} / {nextLevel ? nextLevel.minScore : "MAX"}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
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
  levelCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#C084FC",
    width: "100%",
    maxWidth: 400,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  levelText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444",
    marginTop: 5,
  },
  scoreText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#C084FC",
    borderRadius: 5,
  },
});

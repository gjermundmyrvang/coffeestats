import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const levels = [
  { name: "Bronze Brewer", minScore: 0, color: "#cd7f32" },
  { name: "Silver Roaster", minScore: 100, color: "#c0c0c0" },
  { name: "Gold Barista", minScore: 300, color: "#ffd700" },
  { name: "Platinum Taster", minScore: 600, color: "#e5e4e2" },
  { name: "Elite Espresso", minScore: 1000, color: "#4b2c20" },
  { name: "Master Roaster", minScore: 1500, color: "#8b4513" },
  { name: "Grand Brewer", minScore: 2100, color: "#5c4033" },
  { name: "Titanium Connoisseur", minScore: 2800, color: "#878787" },
  { name: "Executive Cupping Expert", minScore: 3600, color: "#3e2723" },
  { name: "The Coffee Magnate", minScore: 4500, color: "#2d1b14" },
];

export default function Loggingscreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("profile");
      const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;
      setProfile(parsedProfile);
      setLoading(false);

      loadLevel(parsedProfile);
    } catch (error) {
      console.error("Error loading profile (profilescreen):", error);
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
          <Text style={styles.info}>Birth: {profile?.birth || "N/A"}</Text>
          <Text style={styles.info}>Height: {profile?.height || "N/A"} cm</Text>
          <Text style={styles.info}>Weight: {profile?.weight || "N/A"} kg</Text>
        </View>
        <View
          style={[
            styles.levelCard,
            { borderColor: `${level.currentLevel.color}` },
          ]}
        >
          <Text style={styles.levelTitle}>Coffee Rank</Text>
          <Text style={styles.levelText}>{level.currentLevel.name}</Text>
          <Text style={styles.scoreText}>
            Score: {profile.points} / {level ? level.nextLevel.minScore : "MAX"}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${level.progress * 100}%`,
                  backgroundColor: `${level.currentLevel.color}`,
                },
              ]}
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
    borderRadius: 5,
  },
});

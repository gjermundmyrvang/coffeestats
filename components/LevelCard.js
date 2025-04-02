import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LevelCard({ level, points }) {
  return (
    <View
      style={[styles.levelCard, { borderColor: `${level.currentLevel.color}` }]}
    >
      <Text style={styles.levelTitle}>Coffee Rank</Text>
      <Text style={styles.levelText}>{level.currentLevel.name}</Text>
      <Text style={styles.scoreText}>
        Score: {points} / {level ? level.nextLevel.minScore : "MAX"}
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
  );
}

const styles = StyleSheet.create({
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

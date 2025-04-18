import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function LevelCard({ level, points }) {
  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    shadowColor: level.currentLevel.color,
    shadowOpacity: 0.5 + glow.value * 0.4,
    shadowRadius: 10 + glow.value * 5,
    shadowOffset: { width: 0, height: 0 },
    transform: [{ scale: 1 + glow.value * 0.02 }],
  }));

  if (!level)
    return (
      <View style={styles.levelCard}>
        <Text style={styles.levelTitle}>Failed getting level</Text>
      </View>
    );

  return (
    <View style={styles.levelCard}>
      <Text style={styles.levelTitle}>Coffee Rank</Text>
      <Text style={styles.levelText}>{level.currentLevel.name}</Text>
      <Text style={styles.scoreText}>
        Score: {points} / {level ? level.nextLevel.minScore : "MAX"}
      </Text>

      {/* Progress Bar */}
      <Animated.View style={[styles.glowWrapper, animatedGlowStyle]}>
        <View
          style={[
            styles.progressBar,
            { borderColor: level.currentLevel.color },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${level.progress * 100}%`,
                backgroundColor: level.currentLevel.color,
              },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  levelCard: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
    width: "100%",
    maxWidth: 400,
    position: "relative",
    overflow: "hidden",
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  levelText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  scoreText: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 4,
  },
  glowWrapper: {
    borderRadius: 12,
    padding: 2,
  },
  progressBar: {
    width: "100%",
    height: 12,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
});

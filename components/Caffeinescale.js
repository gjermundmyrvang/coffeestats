import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CaffeineScale({
  totalCaffeineMg,
  caffeineLimitMg = 400,
}) {
  const percentage = Math.min((totalCaffeineMg / caffeineLimitMg) * 100, 100);

  let status = "You're good!";
  let color = "#4CAF50";

  if (percentage >= 90) {
    status = "You've had a lot!";
    color = "#E53935";
  } else if (percentage >= 60) {
    status = "Take it slow";
    color = "#FFC107";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caffeine Status Today:</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={[styles.status, { color }]}>{status}</Text>
      <Text style={styles.mgLabel}>
        {Math.round(totalCaffeineMg)}mg / {caffeineLimitMg}mg (recommended
        amount)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#2e2e2e",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  barBackground: {
    height: 14,
    backgroundColor: "#444",
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  mgLabel: {
    marginTop: 4,
    color: "#aaa",
    fontSize: 14,
  },
});

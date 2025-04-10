import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DailyMessage({ data, onClose }) {
  const [todaysCoffee, settodaysCoffe] = useState(null);

  useEffect(() => {
    settodaysCoffe(randomItem(data));
  }, []);

  const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <View style={styles.container}>
      {todaysCoffee && (
        <>
          <View style={styles.messageContent}>
            <Text style={styles.title}>☕ Today's Recommendation</Text>
            <Text style={styles.subtitle}>{todaysCoffee.name}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle" size={26} color="#444" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  messageContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginLeft: 12,
  },
});

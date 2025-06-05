import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DailyMessage({ data, onClose }) {
  const [todaysCoffee, setTodaysCoffee] = useState(null);

  useEffect(() => {
    setTodaysCoffee(randomItem(data));
  }, []);

  const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <View style={styles.container}>
      {todaysCoffee && (
        <>
          <View style={styles.messageContent}>
            <Text style={styles.title}>Today's Recommendation</Text>
            <Text style={styles.subtitle}>☕ {todaysCoffee.name}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle" size={26} color="#ececec" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "95%",
    left: 10,
    bottom: 25,
    backgroundColor: "#1d1d1d",
    opacity: 0.95,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
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
    color: "#fafafa",
  },
  subtitle: {
    fontSize: 14,
    color: "#ececec",
  },
  closeButton: {
    marginLeft: 12,
  },
});

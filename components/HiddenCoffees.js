import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function HiddenCoffeeList({
  hidden,
  coffeeData,
  onToggleHidden,
}) {
  const [expanded, setExpanded] = useState(false);

  const hiddenCoffees = coffeeData.filter((item) => hidden.includes(item.name));

  if (hiddenCoffees.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {expanded ? "Hide hidden coffees ▲" : "Show hidden coffees ▼"}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={hiddenCoffees}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <TouchableOpacity
                onPress={() => onToggleHidden(item.name)}
                style={styles.unhideButton}
              >
                <Text style={styles.unhideText}>Unhide</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  toggleButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
  },
  card: {
    backgroundColor: "#ffffff",
    marginTop: 12,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  unhideButton: {
    alignSelf: "flex-start",
    backgroundColor: "#1d1d1d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  unhideText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
});

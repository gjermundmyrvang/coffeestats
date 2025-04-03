import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatCards } from "./StatCards";
import StatCharts from "./StatCharts";

export default function Stats({ entries }) {
  const [filter, setFilter] = useState("default");
  if (entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEntries}>
          No data available. Start logging your coffee! ☕
        </Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "default" && styles.activeFilter,
          ]}
          onPress={() => setFilter("default")}
        >
          <Text style={styles.filterText}>Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "charts" && styles.activeFilter,
          ]}
          onPress={() => setFilter("charts")}
        >
          <Text style={styles.filterText}>Chart View</Text>
        </TouchableOpacity>
      </View>
      {filter === "default" ? (
        <StatCards entries={entries} />
      ) : (
        <StatCharts entries={entries} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  noEntries: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: "#FF6868", // Coffee brown
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

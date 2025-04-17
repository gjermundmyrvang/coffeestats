import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function History({ entries, onDelete }) {
  const [filter, setFilter] = useState("all");

  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.name]) {
      acc[entry.name] = { name: entry.name, sumMg: 0, count: 0 };
    }
    let sum = Number(entry.sumMg);
    acc[entry.name].sumMg += sum;
    acc[entry.name].count += 1;
    return acc;
  }, {});

  const groupedData = Object.values(groupedEntries);

  const handleDelete = (id) => {
    Alert.alert(
      "Are you sure?",
      `This will delete the entry and cannot be undone`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "grouped" && styles.activeFilter,
          ]}
          onPress={() => setFilter("grouped")}
        >
          <Text style={styles.filterText}>By Coffee Type</Text>
        </TouchableOpacity>
      </View>

      {entries.length === 0 ? (
        <Text style={styles.noEntries}>No entries yet. Start logging! ☕</Text>
      ) : (
        <FlatList
          data={filter === "all" ? entries : groupedData}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          renderItem={({ item, index }) =>
            filter === "all" ? (
              <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                <CoffeeCard item={item} onclick={() => handleDelete(index)} />
              </Animated.View>
            ) : (
              <GroupedCoffeeCard item={item} />
            )
          }
        />
      )}
    </View>
  );
}

const CoffeeCard = ({ item, onclick }) => (
  <View style={styles.card}>
    <Text style={styles.coffeeName}>{item.name}</Text>
    <Text style={styles.caffeine}>{item.sumMg} mg caffeine</Text>
    <Text style={styles.date}>
      {item.date} at {item.time}
    </Text>
    <TouchableOpacity style={styles.deleteButton} onPress={onclick}>
      <Ionicons name="trash-sharp" size={16} color={"#fff"} />
    </TouchableOpacity>
  </View>
);

const GroupedCoffeeCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.coffeeName}>
      {item.name} ({item.count}x)
    </Text>
    <Text style={styles.caffeine}>
      Total caffeine: {item.sumMg.toFixed(1)}mg
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#6b4f4f", // Coffee brown
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  coffeeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  caffeine: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Loggingscreen() {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadCoffeeLogs();
    }, [])
  );

  const loadCoffeeLogs = async () => {
    try {
      const storedData = await AsyncStorage.getItem("coffeeLogs");
      if (storedData) {
        const parsed = JSON.parse(storedData).sort((a, b) => a.date - b.date);
        console.log("Parsed coffeedata:", parsed);
        setEntries(parsed);
      }
    } catch (error) {
      console.log("Failed retrieving coffee entries", error);
      return [];
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Coffee Log</Text>

        {entries.length === 0 ? (
          <Text style={styles.noEntries}>
            No entries yet. Start logging! ☕
          </Text>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CoffeeCard item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const CoffeeCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.coffeeName}>{item.name}</Text>
    <Text style={styles.caffeine}>{item.sumMg} mg caffeine</Text>
    <Text style={styles.date}>
      {item.date} at {item.time}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  noEntries: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
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
});

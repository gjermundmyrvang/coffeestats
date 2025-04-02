import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Stats({ entries }) {
  if (entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEntries}>
          No data available. Start logging your coffee! ☕
        </Text>
      </View>
    );
  }

  const totalCoffees = entries.length;

  const coffeeTypes = entries.reduce((acc, entry) => {
    acc[entry.name] = (acc[entry.name] || 0) + 1;
    return acc;
  }, {});

  const totalCaffeine = entries
    .reduce((sum, entry) => sum + parseFloat(entry.sumMg), 0)
    .toFixed(1);

  const sortedByDate = [...entries].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const firstCoffeeDate = sortedByDate[0]?.date;
  const lastCoffeeDate = sortedByDate[sortedByDate.length - 1]?.date;

  const sortedByTime = [...entries].sort((a, b) =>
    a.time.localeCompare(b.time)
  );
  const earliestCoffeeTime = sortedByTime[0]?.time;
  const latestCoffeeTime = sortedByTime[sortedByTime.length - 1]?.time;

  const timeFrequency = entries.reduce((acc, entry) => {
    const hour = entry.time.split(":")[0];
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const mostActiveHour = Object.keys(timeFrequency).reduce((a, b) =>
    timeFrequency[a] > timeFrequency[b] ? a : b
  );

  const caffeineByType = entries.reduce((acc, entry) => {
    acc[entry.name] = (acc[entry.name] || 0) + parseFloat(entry.sumMg);
    return acc;
  }, {});

  const highestCaffeineCoffee = Object.keys(caffeineByType).reduce((a, b) =>
    caffeineByType[a] > caffeineByType[b] ? a : b
  );

  return (
    <ScrollView style={styles.container}>
      {/* Total Coffees & Total Caffeine Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.cardColumn}>
            <FontAwesome5 name="coffee" size={24} color="#6b4f4f" />
            <Text style={styles.cardHeader}>Total Coffee's</Text>
            <Text style={styles.cardValue}>{totalCoffees} cups</Text>
          </View>
          <View style={styles.cardColumn}>
            <Ionicons name="pulse-sharp" size={20} color={"#6b4f4f"} />
            <Text style={styles.cardHeader}>Total Caffeine</Text>
            <Text style={styles.cardValue}>{totalCaffeine} mg</Text>
          </View>
        </View>
      </View>

      {/* First & Last Coffee Date Card */}
      <View style={styles.card}>
        <Ionicons name="calendar-sharp" size={24} color="#6b4f4f" />
        <View style={styles.row}>
          <View style={styles.cardColumn}>
            <Text style={styles.cardHeader}>First Coffee</Text>
            <Text style={styles.cardValue}>{firstCoffeeDate}</Text>
          </View>
          <View style={styles.cardColumn}>
            <Text style={styles.cardHeader}>Recent Coffee</Text>
            <Text style={styles.cardValue}>{lastCoffeeDate}</Text>
          </View>
        </View>
      </View>

      {/* Earliest & Latest Coffee Time Card */}
      <View style={styles.card}>
        <Ionicons name="time-sharp" size={24} color="#6b4f4f" />
        <View style={styles.row}>
          <View style={styles.cardColumn}>
            <Text style={styles.cardHeader}>Earliest Coffee</Text>
            <Text style={styles.cardValue}>{earliestCoffeeTime}</Text>
          </View>
          <View style={styles.cardColumn}>
            <Text style={styles.cardHeader}>Latest Coffee</Text>
            <Text style={styles.cardValue}>{latestCoffeeTime}</Text>
          </View>
        </View>
      </View>

      {/* Most Active Hour Card */}
      <View style={styles.card}>
        <Ionicons name="bar-chart-sharp" size={24} color="#6b4f4f" />
        <Text style={styles.cardHeader}>Most Active Hour</Text>
        <Text style={styles.cardValue}>{mostActiveHour}:00</Text>
      </View>

      {/* Highest Caffeine Provider Card */}
      <View style={styles.card}>
        <Ionicons name="pie-chart-sharp" size={24} color="#6b4f4f" />
        <Text style={styles.cardHeader}>Highest Caffeine Provider</Text>
        <Text style={styles.cardValue}>{highestCaffeineCoffee}</Text>
      </View>

      {/* Coffees Per Type Card */}
      <View style={styles.card}>
        <Ionicons name="list-sharp" size={24} color="#6b4f4f" />
        <Text style={styles.cardHeader}>Coffee's Per Type</Text>
        {Object.entries(coffeeTypes).map(([type, count]) => (
          <Text key={type} style={styles.cardValue}>
            {type}: {count}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#fafafa",
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardColumn: {
    flex: 1,
    marginRight: 10,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  noEntries: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

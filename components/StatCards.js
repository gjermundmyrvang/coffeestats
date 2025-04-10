import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const StatCards = ({ entries }) => {
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

  const coffeesToday = [...entries].filter(
    (d) => d.date === new Date().toLocaleDateString()
  );

  const caffeineToday = coffeesToday
    .reduce((sum, entry) => sum + parseFloat(entry.sumMg), 0)
    .toFixed(1);

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

  const ListItem = ({ icon, label, value }) => (
    <View style={styles.item}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ListItem
        icon={<Ionicons name="bar-chart-outline" size={20} color="#FF6868" />}
        label="Coffees Today"
        value={`${coffeesToday.length} cups`}
      />
      <ListItem
        icon={<Ionicons name="cafe-outline" size={20} color="#FF6868" />}
        label="Caffeine Today"
        value={`${caffeineToday} mg`}
      />
      <ListItem
        icon={<FontAwesome5 name="coffee" size={18} color="#FF6868" />}
        label="Total Coffees"
        value={`${totalCoffees} cups`}
      />
      <ListItem
        icon={<Ionicons name="pulse" size={20} color="#FF6868" />}
        label="Total Caffeine"
        value={`${totalCaffeine} mg`}
      />
      <ListItem
        icon={<Ionicons name="calendar-outline" size={20} color="#FF6868" />}
        label="First Coffee"
        value={firstCoffeeDate}
      />
      <ListItem
        icon={<Ionicons name="calendar-sharp" size={20} color="#FF6868" />}
        label="Recent Coffee"
        value={lastCoffeeDate}
      />
      <ListItem
        icon={<Ionicons name="alarm-outline" size={20} color="#FF6868" />}
        label="Earliest Coffee"
        value={earliestCoffeeTime}
      />
      <ListItem
        icon={<Ionicons name="alarm" size={20} color="#FF6868" />}
        label="Latest Coffee"
        value={latestCoffeeTime}
      />
      <ListItem
        icon={<Ionicons name="bar-chart" size={20} color="#FF6868" />}
        label="Most Active Hour"
        value={`${mostActiveHour}:00`}
      />
      <ListItem
        icon={<Ionicons name="flame" size={20} color="#FF6868" />}
        label="Caffeine Provider"
        value={highestCaffeineCoffee}
      />

      <View
        style={[
          styles.item,
          {
            flexDirection: "column",
            alignItems: "flex-start",
            borderBottomWidth: 0,
          },
        ]}
      >
        <View style={styles.left}>
          <Ionicons name="list" size={20} color="#FF6868" />
          <Text style={styles.label}>Coffee Types</Text>
        </View>
        <View style={{ marginTop: 8, paddingLeft: 28 }}>
          {Object.entries(coffeeTypes).map(([type, count]) => (
            <Text key={type} style={styles.typeItem}>
              • {type}: {count}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1d1d",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#2e2e2e",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 15,
    color: "#fafafa",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fafafa",
  },
  typeItem: {
    fontSize: 14,
    color: "#fafafa",
    paddingVertical: 2,
  },
});

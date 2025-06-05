import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CaffeineScale from "./Caffeinescale";

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
      <View style={styles.itemRow}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CaffeineScale totalCaffeineMg={caffeineToday} />
      <View style={styles.cardRow}>
        <ListItemCard
          icon={<Ionicons name="bar-chart-outline" size={20} color="#FF0A3B" />}
          label="Coffees Today"
          value={`${coffeesToday.length} cups`}
        />
        <ListItemCard
          icon={
            <Ionicons name="heart-circle-sharp" size={20} color="#FF0A3B" />
          }
          label="Caffeine Today"
          value={`${caffeineToday} mg`}
        />
      </View>
      <View style={styles.cardRow}>
        <ListItemCard
          icon={<FontAwesome5 name="coffee" size={18} color="#FF0A3B" />}
          label="Total Coffees"
          value={`${totalCoffees} cups`}
        />
        <ListItemCard
          icon={<Ionicons name="pulse" size={20} color="#FF0A3B" />}
          label="Total Caffeine"
          value={`${totalCaffeine} mg`}
        />
      </View>
      <View style={styles.cardRow}>
        <ListItemCard
          icon={<Ionicons name="calendar-outline" size={20} color="#FF0A3B" />}
          label="First Coffee"
          value={firstCoffeeDate}
        />
        <ListItemCard
          icon={<Ionicons name="calendar-sharp" size={20} color="#FF0A3B" />}
          label="Recent Coffee"
          value={lastCoffeeDate}
        />
      </View>
      <View style={styles.cardRow}>
        <ListItemCard
          icon={<Ionicons name="alarm-outline" size={20} color="#FF0A3B" />}
          label="Earliest Coffee"
          value={earliestCoffeeTime}
        />
        <ListItemCard
          icon={<Ionicons name="alarm" size={20} color="#FF0A3B" />}
          label="Latest Coffee"
          value={latestCoffeeTime}
        />
      </View>
      <ListItem
        icon={<Ionicons name="time-sharp" size={20} color="#00C8C8" />}
        label="Most Active Hour"
        value={`${mostActiveHour}:00`}
      />
      <ListItem
        icon={<Ionicons name="flame" size={20} color="#00C8C8" />}
        label="Caffeine Provider"
        value={highestCaffeineCoffee}
      />
      <View style={styles.typesContainer}>
        <View style={styles.rowHeader}>
          <Ionicons name="list" size={20} color="#FFDD00" />
          <Text style={[styles.label, { color: "#FFDD00" }]}>Coffee Types</Text>
        </View>
        <ScrollView style={styles.typeScroll} horizontal={true}>
          {Object.entries(coffeeTypes).map(([type, count]) => (
            <View style={styles.countCard} key={type}>
              <Text style={styles.typeText}>{type}</Text>
              <Text style={styles.countText}>{count} cups</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const ListItemCard = ({ icon, label, value }) => (
  <View style={styles.cardItem}>
    <View style={styles.rowHeader}>
      <>
        {icon}
        <Text style={styles.cardLabel}>{label}</Text>
      </>
    </View>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#141217",
    borderRadius: 12,
  },
  item: {
    marginTop: 10,
    width: "100%%",
    padding: 8,
    backgroundColor: "#131F39",
    borderRadius: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "#00C8C8",
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  typeItem: {
    fontSize: 14,
    color: "#fafafa",
    paddingVertical: 2,
  },
  cardRow: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardItem: {
    width: "49%",
    padding: 8,
    backgroundColor: "#38151C",
    borderRadius: 12,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 15,
    color: "#FF0A3B",
    fontWeight: "500",
  },
  cardValue: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#fafafa",
    alignSelf: "flex-end",
  },
  typesContainer: {
    padding: 8,
    width: "100%",
    marginTop: 10,
    backgroundColor: "#102329",
    borderRadius: 12,
  },
  countCard: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#E48300",
    borderRadius: 12,
    opacity: 0.5,
    width: 120,
    minHeight: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeText: {
    fontSize: 12,
    color: "#102329",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  countText: {
    fontSize: 22,
    color: "#102329",
    fontWeight: "800",
  },
  typeScroll: {
    marginTop: 10,
    paddingBottom: 10,
  },
});

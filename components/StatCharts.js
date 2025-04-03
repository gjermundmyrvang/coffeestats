import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BarPlotChart from "./charts/BarPlotChart";
import LinePlotCharts from "./charts/LinePlotChart";

const colorPalette = [
  "#FF6347",
  "#4682B4",
  "#32CD32",
  "#FFD700",
  "#8A2BE2",
  "#FF4500",
  "#008080",
  "#000",
  "#FF6868",
];

export default function StatCharts({ entries }) {
  const coffeeCounts = entries.reduce((acc, entry) => {
    acc[entry.name] = (acc[entry.name] || 0) + 1;
    return acc;
  }, {});

  const mgCounts = entries.reduce((acc, entry) => {
    acc[entry.name] = (acc[entry.name] || 0) + parseFloat(entry.sumMg);
    return acc;
  }, {});

  console.log(mgCounts);

  const cupData = Object.keys(coffeeCounts).map((coffeeName, i) => ({
    name: coffeeName,
    amount: coffeeCounts[coffeeName],
    color: colorPalette[i % colorPalette.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  const mgData = Object.keys(coffeeCounts).map((coffeeName, i) => ({
    name: coffeeName,
    amount: mgCounts[coffeeName],
    color: colorPalette[i % colorPalette.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <LinePlotCharts entries={entries} />
      <View style={styles.barContainer}>
        <View style={styles.barRow}>
          <Text style={styles.header}>Total Cups</Text>
          <Text style={styles.header}>Total Mg</Text>
        </View>
        <View style={styles.barRow}>
          <BarPlotChart data={cupData} />
          <BarPlotChart data={mgData} />
        </View>
        <View style={styles.legendContainer}>
          {cupData.map((item, index) => (
            <View style={styles.legendItem} key={index}>
              <View
                style={[styles.legendColorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6868",
  },
  barContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  barRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 50,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});

import moment from "moment";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const timeframes = ["Week", "Month"];

export default function LinePlotCharts({ entries }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Week");

  const groupEntriesByTimeframe = (timeframe) => {
    return entries.reduce((acc, entry) => {
      const date = moment(entry.date, "D/M/YYYY");
      let key;
      if (timeframe === "Week") {
        key = `Week ${date.isoWeek()}`;
      } else if (timeframe === "Month") {
        key = date.format("MMMM YYYY");
      }

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const chartData = groupEntriesByTimeframe(selectedTimeframe);
  const labels = Object.keys(chartData);
  const dataPoints = Object.values(chartData);
  console.log("chartData", chartData);
  console.log("Labels", labels);
  console.log("DataPoints", dataPoints);

  const data = {
    labels,
    datasets: [{ data: dataPoints }],
    legend: [`Cups per ${selectedTimeframe}`],
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {timeframes.map((timeframe) => (
          <Text
            key={timeframe}
            style={[
              styles.button,
              selectedTimeframe === timeframe && styles.activeButton,
            ]}
            onPress={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </Text>
        ))}
      </View>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff5f5",
  backgroundGradientTo: "#ffe6e6",
  color: (opacity = 1) => `rgba(255, 104, 104, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.8,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#777",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeButton: {
    color: "#FF6868",
    borderBottomColor: "#FF6868",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
});

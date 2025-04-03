import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function BarPlotChart({ data }) {
  return (
    <PieChart
      data={data}
      width={200}
      height={200}
      chartConfig={chartConfig}
      accessor={"amount"}
      backgroundColor={"transparent"}
      center={[50, 0]}
      hasLegend={false}
    />
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

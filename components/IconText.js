import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function IconText({
  text,
  iconName,
  size = 20,
  color = "#000",
  textStyle = {},
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={size} color={color} />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

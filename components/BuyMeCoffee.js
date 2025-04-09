import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const BuyMeCoffee = () => {
  const handlePress = () => {
    Linking.openURL("https://www.buymeacoffee.com/gjermundmyrvang");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Buy Me a Coffee</Text>
        <Ionicons name="cafe-sharp" size={22} color={"#1d1d1d"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FFDD00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginRight: 10,
  },
});

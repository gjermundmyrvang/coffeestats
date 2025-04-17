import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Credits() {
  const openGitHub = () => {
    Linking.openURL("https://github.com/gjermundmyrvang");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Coffee Stats</Text>
      <Text style={styles.description}>
        This app actually started out as a bit of a joke. I wanted to track my
        own coffee habits and thought it’d be fun to see some stats after
        logging my caffeine intake over time.
      </Text>
      <Text style={styles.description}>
        When I showed the idea to a few friends, they wanted to try it too — so
        I decided to turn it into a real app. I kept things super simple: no
        external servers or cloud storage, just local data so I could build and
        ship the first version quickly and keep improving it from there.
      </Text>
      <Text style={styles.description}>Hope you enjoy using it!</Text>
      <View style={styles.section}>
        <Text style={styles.subheading}>Developer</Text>
        <Text style={styles.name}>@gjermundmyrvang</Text>
        <TouchableOpacity style={styles.linkButton} onPress={openGitHub}>
          <Ionicons name="logo-github" size={20} color="#1d1d1d" />
          <Text style={styles.linkText}>View on GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1d1d1d",
  },
  name: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: "#1d1d1d",
    textDecorationLine: "underline",
  },
});

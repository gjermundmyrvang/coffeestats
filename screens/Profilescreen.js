import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BuyMeCoffee } from "../components/BuyMeCoffee";
import LevelCard from "../components/LevelCard";
import { ProfileContext } from "../context/ProfileContext";
import { levelsdata } from "../data/levels";

const levels = levelsdata;

export default function Profilescreen() {
  const { profile, loading } = useContext(ProfileContext);
  const [level, setLevel] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (profile) {
        loadLevel(profile);
      }
    }, [profile])
  );

  const loadLevel = (profile) => {
    let currentLevel = levels[0];
    let nextLevel = levels[1];

    const score = Number(profile?.points) || 0;
    console.log("Score:", score);

    for (let i = levels.length - 1; i >= 0; i--) {
      if (score >= levels[i].minScore) {
        currentLevel = levels[i];
        nextLevel = levels[i + 1] || null;
        break;
      }
    }

    const progress = nextLevel
      ? (score - currentLevel.minScore) /
        (nextLevel.minScore - currentLevel.minScore)
      : 1;

    console.log("Progress:", progress);
    setLevel({ currentLevel, nextLevel, progress });
  };

  const handleNavigate = () => {
    navigation.navigate("settings");
  };

  if (loading || !profile || !level) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.name}>{profile?.name || "Unknown"}</Text>
          <Text style={styles.info}>
            Favorite coffee: {profile?.favCoffee || "edit in settings"}
          </Text>
          <Text style={styles.info}>
            Favorite treat: {profile?.favTreat || "edit in settings"}
          </Text>
        </View>
        <LevelCard level={level} points={profile.points} />
        <BuyMeCoffee />
        <GButton onPress={handleNavigate} />
      </View>
    </SafeAreaView>
  );
}

const GButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons
          name="cog-sharp"
          size={20}
          color="#1d1d1d"
          style={styles.icon}
        />
        <Text style={styles.text}>Settings</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
    maxWidth: 400,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "#1d1d1d",
    fontSize: 16,
    fontWeight: "600",
  },
});

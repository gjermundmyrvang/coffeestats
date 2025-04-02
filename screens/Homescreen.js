import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { coffeedata } from "../data/coffeedata";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const coffeeData = coffeedata;

export default function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [greeting, setGreeting] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeData[0]);
  const [selectedSize, setSelectedSize] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      setLoading(false);
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {greeting} {profile ? profile.name.split(" ")[0] : "there"}! 👋
        </Text>
      </View>
      <FlatList
        data={coffeeData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CoffeeCard
            coffee={item}
            setModalVisible={setModalVisible}
            setSelectedCoffee={setSelectedCoffee}
            setSelectedSize={setSelectedSize}
          />
        )}
      />
      <BottomModal
        coffee={selectedCoffee}
        size={selectedSize}
        visible={modalVisible}
        setVisible={setModalVisible}
        profile={profile}
        setProfile={setProfile}
      />
    </SafeAreaView>
  );
}

const CoffeeCard = ({
  coffee,
  setModalVisible,
  setSelectedCoffee,
  setSelectedSize,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedCoffee(coffee);
    setSelectedSize(size);
    setModalVisible(true);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.coffeeName}>{coffee.name}</Text>
        {expanded ? (
          <FontAwesome5 name="arrow-up" size={20} color="#1d1d1d" />
        ) : (
          <FontAwesome5 name="arrow-down" size={20} color="#e0e0e0" />
        )}
      </View>

      <View style={styles.sizesContainer}>
        <FontAwesome5 name="coffee" size={24} color="#6b4f4f" />
        {coffee.sizes_ml.map((size) => (
          <TouchableOpacity
            key={size}
            style={styles.sizeButton}
            onPress={() => handleSizeSelect(size)}
          >
            <Text style={styles.sizeText}>{size}ml</Text>
          </TouchableOpacity>
        ))}
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>{coffee.description}</Text>
          <Text style={styles.caffeine}>
            {coffee.caffeine_mg}mg caffeine per ml
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const BottomModal = ({
  coffee,
  size,
  visible,
  setVisible,
  profile,
  setProfile,
}) => {
  const calculateCaffeine = (size) => {
    return (coffee.caffeine_mg * size).toFixed(1);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSave = async () => {
    const sum = calculateCaffeine(size);
    const date = new Date();
    try {
      const newEntry = {
        name: coffee.name,
        sumMg: sum,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };

      const existingLogs = await AsyncStorage.getItem("coffeeLogs");
      const logs = existingLogs ? JSON.parse(existingLogs) : [];

      logs.push(newEntry);

      await AsyncStorage.setItem("coffeeLogs", JSON.stringify(logs));
      await addPoints();
      console.log("Saved coffee:", newEntry);
      setVisible(!visible);
    } catch (error) {
      console.log("Failed saving coffee", error);
      setVisible(!visible);
    }
  };

  const addPoints = async () => {
    const currentPoints = +profile.points;
    console.log("Current points:", currentPoints);
    const newPoints = currentPoints + 20;
    console.log("New points:", newPoints);
    setProfile({ ...profile, points: newPoints });
    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({
        ...profile,
        points: newPoints,
      })
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal} // Handle close correctly
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{coffee.name}</Text>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <Ionicons name="close-circle" size={42} color={"#9A1A1A"} />
          </TouchableOpacity>
          <Text style={styles.modalContent}>Size: {size}ml</Text>
          <Text style={styles.modalContent}>
            Total caffeine: {calculateCaffeine(size)}mg
          </Text>
          <Text style={styles.modalContent}>
            Date: {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.modalContent}>
            Time: {new Date().toLocaleTimeString()}
          </Text>
          {/* Save Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleSave}>
            <Text style={styles.closeButtonText}>Log coffee</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  flatlist: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coffeeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  caffeine: {
    fontSize: 14,
    color: "#888",
  },
  sizesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  sizeButton: {
    backgroundColor: "#6b4f4f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fafafa",
    fontStyle: "italic",
  },
  expandedContent: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  modalContent: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6b4f4f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

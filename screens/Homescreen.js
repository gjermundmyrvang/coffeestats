import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coffeedata } from "../data/coffeedata";

const coffeeData = coffeedata;

export default function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [greeting, setGreeting] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeData[0]);
  const [selectedSize, setSelectedSize] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem("profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      setLoading(false);
    };
    loadProfile();
  }, []);

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
      </View>

      <View style={styles.sizesContainer}>
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

const BottomModal = ({ coffee, size, visible, setVisible }) => {
  const calculateCaffeine = (size) => {
    console.log(size);
    return (coffee.caffeine_mg * size).toFixed(1);
  };

  const handleCloseModal = () => {
    setVisible(false); // Only close modal when triggered
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

      logs.push(newEntry); // Append new entry

      await AsyncStorage.setItem("coffeeLogs", JSON.stringify(logs));
      console.log("Saved coffee:", newEntry);
      setVisible(!visible);
    } catch (error) {
      console.log("Failed saving coffee", error);
      setVisible(!visible);
    }
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
          <View style={styles.buttons}>
            {/* Save Button */}
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: "#4CAF50" }]}
              onPress={handleSave}
            >
              <Text style={styles.closeButtonText}>Log</Text>
            </TouchableOpacity>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal} // Use the proper handler
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 10,
  },
  sizeButton: {
    backgroundColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "bold",
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
    backgroundColor: "#fafafa",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 5,
  },
  closeButton: {
    backgroundColor: "#B0BEC5",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
});

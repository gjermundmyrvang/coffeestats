import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

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
import moment from "moment";
import DailyMessage from "../components/DailyMessage";
import { STORAGEKEYS } from "../constants/AsyncKeys";

const coffeeData = coffeedata;
const DAILY_MESSAGE_KEY = "lastMessageDate";

export default function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [showDaily, setShowDaily] = useState(false);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(STORAGEKEYS.PROFILE);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      setLoading(false);
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  };

  useEffect(() => {
    loadProfile();
    checkDailyMessage();
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

  const checkDailyMessage = async () => {
    try {
      const today = moment().format("YYYY-MM-DD");
      const lastShown = await AsyncStorage.getItem(STORAGEKEYS.DAILYMESSAGE);

      if (lastShown !== today) {
        setShowDaily(true);
        await AsyncStorage.setItem(STORAGEKEYS.DAILYMESSAGE, today);
      }
    } catch (error) {
      console.error("Error checking daily message:", error);
    }
  };

  const handleRemoveMessage = () => {
    setShowDaily(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Loading profile...</Text>
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
      {showDaily && (
        <DailyMessage data={coffeeData} onClose={handleRemoveMessage} />
      )}
      {coffeeData ? (
        <>
          <FlatList
            data={coffeeData}
            keyExtractor={(item) => item.name}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={({ item }) => (
              <CoffeeCard
                coffee={item}
                setModalVisible={setModalVisible}
                setSelectedCoffee={setSelectedCoffee}
                setSelectedSize={setSelectedSize}
              />
            )}
          />
          {selectedCoffee && (
            <BottomModal
              coffee={selectedCoffee}
              size={selectedSize}
              visible={modalVisible}
              setVisible={setModalVisible}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </>
      ) : (
        <Text>No coffeedata availeable</Text>
      )}
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
          <Ionicons name="chevron-up" size={20} color="#1d1d1d" />
        ) : (
          <Ionicons name="chevron-down" size={20} color="#e0e0e0" />
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

      const existingLogs = await AsyncStorage.getItem(STORAGEKEYS.ENTRIES);
      let logs = [];
      try {
        logs = existingLogs ? JSON.parse(existingLogs) : [];
      } catch (e) {
        console.error("Error parsing existingLogs:", e);
        logs = [];
      }

      logs.push(newEntry);

      await AsyncStorage.setItem(STORAGEKEYS.ENTRIES, JSON.stringify(logs));
      await addPoints();
      console.log("Saved coffee:", newEntry);
      setVisible(!visible);
    } catch (error) {
      console.log("Failed saving coffee", error);
      setVisible(!visible);
    }
  };

  const addPoints = async () => {
    try {
      const currentPoints = Number(profile.points) || 0;
      const newPoints = currentPoints + 20;

      const updatedProfile = { ...profile, points: newPoints };

      setProfile(updatedProfile);
      await AsyncStorage.setItem(
        STORAGEKEYS.PROFILE,
        JSON.stringify(updatedProfile)
      );

      console.log("New points:", newPoints);
    } catch (error) {
      console.error("Error adding points:", error);
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
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{ position: "absolute", top: 15, right: 15 }}
          >
            <Ionicons name="close-circle" size={42} color={"#9A1A1A"} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="resize-sharp" size={20} color={"#555"} />
            <Text style={styles.modalContent}>Size: {size}ml</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="pulse-sharp" size={20} color={"#555"} />
            <Text style={styles.modalContent}>
              Total caffeine: {calculateCaffeine(size)}mg
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="calendar-sharp" size={20} color={"#555"} />
            <Text style={styles.modalContent}>
              Date: {new Date().toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="time-sharp" size={20} color={"#555"} />
            <Text style={styles.modalContent}>
              Time: {new Date().toLocaleTimeString()}
            </Text>
          </View>
          {/* Save Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleSave}
            accessibilityLabel="Log coffee"
          >
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
    backgroundColor: "#e0e0e0",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "flex-start",
    shadowColor: "#FFA641",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: -6 },
    shadowRadius: 18,
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    gap: 5,
  },
  closeButton: {
    backgroundColor: "#6b4f4f",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

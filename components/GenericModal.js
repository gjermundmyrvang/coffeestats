import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const GenericModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={onClose}>
              <Ionicons
                name="close-sharp"
                size={24}
                color={"#1d1d1d"}
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 20,
    maxHeight: "80%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    padding: 10,
    top: 5,
    right: 10,
    zIndex: 10,
  },
});

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

export const GenericModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.iconWrapper} onPress={onClose}>
            <Ionicons
              name="close-sharp"
              size={24}
              color={"#1d1d1d"}
              style={styles.icon}
            />
          </Pressable>
          {children}
        </View>
      </View>
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
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  iconWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 10,
  },
  icon: {
    // No extra styles needed here anymore
  },
});

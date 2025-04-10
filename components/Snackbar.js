import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

export const Snackbar = ({ message, visible }) => {
  const translateY = useSharedValue(80);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      const timer = setTimeout(() => {
        translateY.value = withTiming(80, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!message || !visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.snackbar, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#1d1d1d",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

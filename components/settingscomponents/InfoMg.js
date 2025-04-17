import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function InfoMg() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>How Caffeine Affects Your Body</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Boosts Your Brain</Text>
        <Text style={styles.text}>
          Caffeine is a natural stimulant. It blocks a sleepy chemical in your
          brain called
          <Text style={styles.bold}> adenosine</Text>, making you feel more
          awake, alert, and focused.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Speeds Up Your Heart</Text>
        <Text style={styles.text}>
          Caffeine triggers the release of
          <Text style={styles.bold}> adrenaline</Text>, your "fight or flight"
          hormone. This can raise your heart rate and give you a small energy
          rush.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Fires Up Your Metabolism</Text>
        <Text style={styles.text}>
          Your metabolism gets a gentle boost, helping your body burn a bit more
          energy. That’s why caffeine is often found in pre-workouts and energy
          drinks.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Delays Sleepiness</Text>
        <Text style={styles.text}>
          Since caffeine blocks sleep hormones, it can delay your ability to
          fall asleep. Try to avoid it{" "}
          <Text style={styles.bold}>6–8 hours</Text> before bedtime.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>The Crash</Text>
        <Text style={styles.text}>
          After a few hours, you may feel a dip in energy as the caffeine wears
          off. This is totally normal — especially after high doses.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Fun Fact: It’s All About Balance</Text>
        <Text style={styles.text}>
          Everyone reacts to caffeine differently. Some feel jittery after one
          cup, others can drink several and feel fine. The key is to
          <Text style={styles.bold}> know your limits</Text> and enjoy your
          coffee in a way that works for you!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    paddingVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
});

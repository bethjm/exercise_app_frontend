import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// import Colors from "../../constants/Colors";

import Colors from "../../constants/Colors";

function FifthButton({ children, onPress, style }) {
  return (
    <View style={styles.outterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        onPress={onPress}
      >
        <View style={[styles.content, style]}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    overflow: "hidden",
    backgroundColor: Colors.warmPrimary,
    borderRadius: 10,
    width: 300,
  },
  innerContainer: {},
  content: {
    color: "white",
    alignItems: "center",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default FifthButton;

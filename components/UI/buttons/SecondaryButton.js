import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// import Colors from "../../constants/Colors";

import Colors from "../../constants/Colors";

function SecondaryButton({ children, onPress, style }) {
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
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    width: 150,
    margin: 12,
    elevation: 3,
    fontSize: 20,
    borderColor: "#b06f86",
    borderWidth: 1,
  },
  innerContainer: {},
  content: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});

export default SecondaryButton;

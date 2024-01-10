import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Colors from "./components/constants/Colors";

function NavBar() {
  const navigation = useNavigation();
  //////////  //////////  //////////  //////////  //////////  //////////  //////////  //////////

  ////////// ////////// ////////// ////////// ////////// ////////// ////////// //////////
  const goToHomePage = () => {
    navigation.navigate("HomePage", {});
  };

  const goToHealthData = () => {
    navigation.navigate("Calculate", {});
  };

  const goToWorkouts = () => {
    navigation.navigate("ViewWorkout", {});
  };

  const goToNotes = () => {
    navigation.navigate("NotesStyling", {});
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goToNotes}>
        <Text style={styles.text}>Notes</Text>
      </Pressable>
      <Pressable onPress={goToHealthData}>
        <Text style={styles.text}>Health</Text>
      </Pressable>
      <Pressable onPress={goToHomePage} style={styles.home}>
        <Text style={styles.homeText}>Home</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.text}>Trainers</Text>
      </Pressable>
      <Pressable onPress={goToWorkouts}>
        <Text style={styles.text}>Workouts</Text>
      </Pressable>
    </View>
  );
}

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 80,
    paddingHorizontal: 20,
    elevation: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  home: {
    backgroundColor: Colors.coolThird,
    width: 100,
    height: 100,
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 4,
    borderColor: Colors.thirdBackUp,
    elevation: 1,
    marginBottom: 30,
  },
  homeText: {
    paddingTop: 28,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

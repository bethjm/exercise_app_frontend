import { StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";

import Colors from "../constants/Colors";

import Notes from "../screens/Notes";
import PrimaryButton from "../UI/buttons/PrimaryButton";
import StretchingVideos from "../UI/other/LandingPageComponents/StretchingVideos";
import SecondaryButton from "../UI/buttons/SecondaryButton";

function LandingPage({ exercises, route }) {
  const navigation = useNavigation();

  const [note, setNote] = useState("");

  console.log("landing page opened");

  const goToCreateWorkout = () => {
    navigation.navigate("CreateWorkout", {
      exercises: exercises,
    });
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const savedNote = await AsyncStorage.getItem("note");
        if (savedNote !== null) {
          setNote(savedNote);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getNote();
  }, []);

  const handleNoteChange = async (text) => {
    setNote(text);
    try {
      await AsyncStorage.setItem("note", text);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text onPress={goToCreateWorkout} style={styles.createWorkout}>
        Create New Workout
      </Text>
      <View style={styles.wrapVideos}>{/* <StretchingVideos /> */}</View>
      <View style={styles.notes}>
        {/* <Notes handleNoteChange={handleNoteChange} note={note} /> */}
      </View>
    </ScrollView>
  );
}

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    padding: 30,
    backgroundColor: Colors.coolSecondary,
  },
  greeting: {
    alignItems: "center",
  },
  greetingText: {
    fontSize: 30,
  },
  wrapVideos: {
    flexDirection: "row",
  },
  createWorkout: {
    backgroundColor: Colors.coolPrimary,
    borderColor: "#628899",
    borderWidth: 1,
    width: "80%,",
    height: 120,
    elevation: 2,
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 45,
    margin: 10,
    marginBottom: 30,
    marginTop: 30,
    fontSize: 20,
  },
  notes: {
    marginTop: 20,
  },
});

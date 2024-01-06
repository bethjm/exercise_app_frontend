import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "../../NavBar";

import Colors from "../constants/Colors";

function Notes() {
  const [note, setNote] = useState("");

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
    <View style={styles.container}>
      <Text style={styles.header}>Note to self</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleNoteChange}
          value={note}
          multiline={true}
          numberOfLines={9}
        />
      </View>
      <View style={styles.navBar}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {},
  container: {},
  header: {
    marginBottom: 10,
    fontSize: 25,
    width: "90%",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  inputContainer: { height: "115%" },
  input: {
    paddingBottom: 200,
    borderWidth: 1,
    borderColor: Colors.warmSecondary,
    backgroundColor: Colors.warmSecondary,
    borderRadius: 25,
    fontSize: 20,
    lineHeight: 30,
    paddingLeft: 15,
    paddingTop: 10,
    height: "110%",
  },
  navBar: {
    position: "relative",
    bottom: 87,
    width: "110%",
    marginLeft: -48,
    backgroundColor: "#f2f2f2",
  },
});

export default Notes;

import { StyleSheet, Text, View } from "react-native";

import Notes from "./Notes";

import Colors from "../constants/Colors";

function NotesStyling() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Notes />
      </View>
    </View>
  );
}

export default NotesStyling;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.warmSecondary,
    flex: 1,
  },
  innerContainer: {
    marginTop: 70,
    marginLeft: 50,
    marginRight: 50,
  },
});

import { Text, TextInput, View, StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

function NotesSection({ notes, setNotes }) {
  return (
    <View>
      <Text style={styles.notesTitle}>Notes:</Text>
      <TextInput
        style={styles.notesBox}
        multiline={true}
        onChangeText={(text) => setNotes(text)}
        value={notes}
      />
    </View>
  );
}

export default NotesSection;
const styles = StyleSheet.create({
  notesTitle: { fontSize: 20, textAlign: "center", paddingBottom: 15 },
  notesBox: {
    borderWidth: 0,
    backgroundColor: Colors.warmSecondary,
    height: 200,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
});

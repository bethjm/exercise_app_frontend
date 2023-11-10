import { StyleSheet, Text, View } from "react-native";
function Question({ questionText, questionAnswer, exercises }) {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{questionText}</Text>
    </View>
  );
}

export default Question;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  content: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});

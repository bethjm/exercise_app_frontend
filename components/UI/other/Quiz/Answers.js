import { Pressable, Text, StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

const Answers = ({ answerText, onPress, exercises }) => {
  const handleAnswerSelect = () => {
    onPress(answerText);
  };

  return (
    <Pressable style={styles.answerContainer} onPress={handleAnswerSelect}>
      <Text style={styles.answerText}>{answerText}</Text>
    </Pressable>
  );
};

export default Answers;

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: Colors.coolThird,
    color: "FFFFFF",
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    elevation: 5,
    shadowColor: Colors.coolThird,
    shadowRadius: 40,
    opacity: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  answerText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "auto",
  },
});

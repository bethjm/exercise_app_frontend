import { Text, TextInput, View, FlatList, StyleSheet } from "react-native";

function WorkoutTextInput({ workoutIsSaved, workoutName, setWorkoutName }) {
  return (
    <View>
      {!workoutIsSaved ? (
        <TextInput
          style={styles.input}
          placeholder="Enter workout name"
          onChangeText={(text) => setWorkoutName(text)}
          value={workoutName}
        />
      ) : (
        <Text>Workout saved!</Text>
      )}
    </View>
  );
}

export default WorkoutTextInput;
const styles = StyleSheet.create({
  input: {
    width: 200,
    marginTop: 100,
    height: 100,
    fontSize: 20,
  },
});

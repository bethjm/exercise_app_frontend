import ExerciseListItem from "./ExerciseListItem";
import { View, Text, StyleSheet, FlatList } from "react-native";

function ExerciseList({ displayExercises }) {
  return (
    <FlatList
      data={displayExercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExerciseListItem item={item} />}
    />
  );
}

export default ExerciseList;

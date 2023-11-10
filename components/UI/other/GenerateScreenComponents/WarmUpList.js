import ExerciseListItem from "./ExerciseListItem";
import { View, Text, StyleSheet, FlatList } from "react-native";

function WarmUpList({ warmUpExercises }) {
  return (
    <FlatList
      data={warmUpExercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExerciseListItem item={item} />}
    />
  );
}

export default WarmUpList;

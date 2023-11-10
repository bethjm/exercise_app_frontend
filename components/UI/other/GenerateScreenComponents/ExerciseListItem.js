import { View, Text, StyleSheet, FlatList } from "react-native";

function ExerciseListItem({ item }) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.reps}>
        {item.reps}{" "}
        {(item.subcategory.includes("side_abs") &&
          !item.equipment.includes("yogaball") &&
          !item.equipment.includes("miniband") &&
          !item.equipment.includes("kettlebell") &&
          !item.equipment.includes("dumbell") &&
          !item.equipment.includes("foamroller") &&
          !item.equipment.includes("box")) ||
        (item.subcategory.includes("low_abs") &&
          !item.equipment.includes("yogaball") &&
          !item.equipment.includes("miniband") &&
          !item.equipment.includes("kettlebell") &&
          !item.equipment.includes("dumbell") &&
          !item.equipment.includes("foamroller") &&
          !item.equipment.includes("box")) ||
        (item.subcategory.includes("knee_flexed_abs") &&
          !item.equipment.includes("yogaball") &&
          !item.equipment.includes("miniband") &&
          !item.equipment.includes("kettlebell") &&
          !item.equipment.includes("dumbell") &&
          !item.equipment.includes("foamroller") &&
          !item.equipment.includes("box")) ? (
          <Text>seconds</Text>
        ) : (
          <Text>reps</Text>
        )}
      </Text>
    </View>
  );
}

export default ExerciseListItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  reps: {
    flex: 1,
    textAlign: "right",
  },
});

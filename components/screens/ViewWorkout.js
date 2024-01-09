import { Button, Alert, ScrollView } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ThirdButton from "../UI/buttons/ThirdButton";

import Colors from "../constants/Colors";

function ViewWorkout({ navigation, route }) {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  const { passingSavedWorkouts } = route.params;

  if (passingSavedWorkouts !== undefined) {
    if (savedWorkouts.length === 0) {
      setSavedWorkouts(passingSavedWorkouts);
    }
  }

  let totalCount = 0;

  useEffect(() => {
    const getSavedData = async () => {
      try {
        const workoutKeys = await AsyncStorage.getAllKeys();
        console.log("Workout Keys:", workoutKeys);

        const savedDataArray = await AsyncStorage.multiGet(workoutKeys);
        console.log("Saved Data Array:");

        savedDataArray.forEach(([key, data]) => {
          console.log(`Key: ${key}`);
          console.log("Raw Data:", data);

          // Clean unwanted characters (replace "A" or "U" with an empty string)
          const cleanedData = data.replace(/^[AU]/, "");

          try {
            const parsedData = JSON.parse(cleanedData);
            console.log("Parsed Data:", parsedData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        });

        const filteredData = savedDataArray
          .map(([_, data]) => data.replace(/^[AU]/, ""))
          .map((data) => {
            try {
              return JSON.parse(data);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              return null; // or handle the error in an appropriate way
            }
          })
          .filter((data) => data !== null && data.newWorkoutID !== undefined);

        console.log("Filtered Data:", filteredData);
        setSavedWorkouts(filteredData);
      } catch (error) {
        console.error("Error retrieving saved data:", error);
      }
    };

    getSavedData();
    // const getSavedData = async () => {
    //   try {
    //     const workoutKeys = await AsyncStorage.getAllKeys();
    //     console.log("Workout Keys:", workoutKeys);

    //     const savedDataArray = await AsyncStorage.multiGet(workoutKeys);
    //     console.log("Saved Data Array:");
    //     savedDataArray.forEach(([key, data]) => {
    //       console.log(`Key: ${key}`);
    //       console.log("Data:", data); // Removed JSON.parse
    //     });

    //     const parsedData = savedDataArray.map((data) => JSON.parse(data[1]));
    //     console.log("Parsed Data:", parsedData);

    //     const filteredData = parsedData.filter(
    //       (data) => data.newWorkoutID !== undefined
    //     );
    //     console.log("Filtered Data:", filteredData);

    //     setSavedWorkouts(filteredData);
    //   } catch (error) {
    //     console.error("Error retrieving saved data:", error);
    //   }
    // };

    // getSavedData();
  }, []);

  const goToViewWorkout = (workout, event) => {
    event.persist();
    // setSavedWorkouts([]);
    navigation.navigate("ViewIndWorkout", {
      workout,
      savedWorkouts,
    });
  };

  const goToHomeScreen = () => {
    navigation.navigate("HomePage", {});
  };

  const deleteWorkout = async (workout) => {
    try {
      Alert.alert(
        "Delete Workout",
        "If you delete this workout your notes data will also be deleted. I reccomend you save the notes in the main notes area before deleting",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const newSavedWorkouts = savedWorkouts.filter(
                (savedWorkout) => savedWorkout.title !== workout.title
              );
              await AsyncStorage.removeItem(workout.title);
              setSavedWorkouts(newSavedWorkouts);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  useEffect(() => {
    totalCount += 1;
    console.log("ViewWorkout rendered", totalCount, "times");
  }, []);

  return (
    <View style={styles.container}>
      {/* {console.log("FROM RETURN STATEENT", savedWorkouts.length)}
      {console.log("FROM RETURN STATEENT", savedWorkouts)} */}
      <View style={styles.backButton} onPress={goToHomeScreen}>
        <Text style={styles.backButtonText} onPress={goToHomeScreen}>
          Home Page
        </Text>
      </View>

      {savedWorkouts.length > 0 ? (
        savedWorkouts.map((workout) => (
          <View key={workout.newWorkoutID}>
            <ThirdButton onPress={goToViewWorkout.bind(null, workout)}>
              <Text>{workout.title}</Text>
              <Text onPress={() => deleteWorkout(workout)}>delete</Text>
            </ThirdButton>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No saved workouts found.</Text>
      )}
    </View>
  );
}

export default ViewWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: Colors.thirdBackUp,
  },
  empty: {
    textAlign: "center",
  },
  backButton: {
    backgroundColor: Colors.coolPrimary,
    borderColor: "#628899",
    borderWidth: 1,
    width: "90%",
    height: 120,
    elevation: 2,
    borderRadius: 20,
    paddingTop: 45,
    margin: 10,
    marginBottom: 30,
    marginTop: 30,
  },
  backButtonText: {
    textAlign: "center",
    fontSize: 20,
  },
});

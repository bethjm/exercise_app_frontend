import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Alert, Modal } from "react-native";
import { useState, useEffect } from "react";

import Colors from "../constants/Colors";
import PrimaryButton from "../UI/buttons/PrimaryButton";
import WorkoutTextInput from "../UI/other/GenerateScreenComponents/WorkoutTextInput";
import ExerciseList from "../UI/other/GenerateScreenComponents/ExerciseList";
import WarmUpList from "../UI/other/GenerateScreenComponents/WarmUpList";

function GenerateScreen({ route, navigation }) {
  const { exercises, responseState } = route.params;

  const [splitAssigned, setSplitAssigned] = useState(false);
  const [workoutIsSaved, setWorkoutIsSaved] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [triggerNextFunction, setTriggerNextFunction] = useState(false);
  const [triggerCreateWarmUp, setTriggerCreateWarmUp] = useState(false);

  const [displayExercises, setDisplayExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [warmUpExercises, setWarmUpExercises] = useState([]);
  const [filterWarmupExercises, setFilterWarmupExercises] = useState([]);

  const [workoutName, setWorkoutName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const chosenLocation = responseState.location;
  const chosenGoal = responseState.goals;
  const chosenExperience = responseState.experienceLevel;
  const [chosenSplit, setChosenSplit] = useState([]);

  let assignedWarmUpExercises = [];

  const warmUp = [["lower_body_posterior"], ["core"], "upper_body_posterior"];

  const fullBodySplit = [
    ["power_lowerbody", "power_upperbody"],
    ["core", "upper_body_anterior", "upper_body_posterior"],
    ["core", "lower_body_anterior", "lower_body_posterior"],
  ];

  const lowerBodySplit = [
    ["power_lowerbody", "locomotion_abs"],
    ["knee_flexion", "knee_dominant", "low_abs"],
    ["hip_dominant", "knee_dominant", "side_abs"],
  ];

  const upperBodySplit = [
    ["power_upperbody", "locomotion_abs"],
    ["horizontal_push", "horizontal_pull", "side_abs"],
    ["vertical_push", "vertical_pull", "low_abs"],
  ];

  console.log("generate screen opened");
  ////////////////////////////////////////////////////////////////////////////////////

  let totalCount = 0;

  if (totalCount != 0 && splitAssigned === true) {
    setSplitAssigned(false);
    totalCount = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //LAST FUNCTION
  //assigns reps to exercises based on the equipment and subcategory
  const assignReps = (exercises) => {
    exercises.forEach((exercise) => {
      if (chosenGoal.includes("general_fitness")) {
        if (
          exercise.equipment.includes("bodyweight") ||
          exercise.equipment.includes("barbell") ||
          exercise.equipment.includes("hexbar") ||
          exercise.equipment.includes("pullup_bar")
        ) {
          exercise.minReps = 1;
          exercise.maxReps = 5;
        } else if (exercise.equipment.includes("box")) {
          exercise.minReps = 4;
          exercise.maxReps = 6;
        } else if (
          (exercise.subcategory.includes("side_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("low_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("knee_flexed_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box"))
        ) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else if (exercise.subcategory.includes("locomotion_abs")) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else {
          exercise.minReps = 8;
          exercise.maxReps = 12;
        }
      }

      if (chosenGoal.includes("balance")) {
        if (exercise.equipment.includes("box")) {
          exercise.minReps = 4;
          exercise.maxReps = 6;
        } else if (
          exercise.equipment.includes("bodyweight") ||
          exercise.equipment.includes("miniband") ||
          exercise.equipment.includes("yogaball")
        ) {
          exercise.minReps = 10;
          exercise.maxReps = 15;
        } else if (
          exercise.equipment.includes("dumbbell") ||
          exercise.equipment.includes("kettlebell") ||
          exercise.equipment.includes("hexbar") ||
          exercise.equipment.includes("barbell") ||
          exercise.equipment.includes("cable") ||
          exercise.equipment.includes("ssb")
        ) {
          exercise.minReps = 6;
          exercise.maxReps = 8;
        }
        exercise.minIsometric = 0;
        exercise.maxIsometric = 3;
        exercise.minEccentric = 0;
        exercise.maxEccentric = 3;
      } else if (
        (exercise.subcategory.includes("side_abs") &&
          !exercise.equipment.includes("yogaball") &&
          !exercise.equipment.includes("miniband") &&
          !exercise.equipment.includes("kettlebell") &&
          !exercise.equipment.includes("dumbell") &&
          !exercise.equipment.includes("box")) ||
        (exercise.subcategory.includes("low_abs") &&
          !exercise.equipment.includes("yogaball") &&
          !exercise.equipment.includes("miniband") &&
          !exercise.equipment.includes("kettlebell") &&
          !exercise.equipment.includes("dumbell") &&
          !exercise.equipment.includes("box")) ||
        (exercise.subcategory.includes("knee_flexed_abs") &&
          !exercise.equipment.includes("yogaball") &&
          !exercise.equipment.includes("miniband") &&
          !exercise.equipment.includes("kettlebell") &&
          !exercise.equipment.includes("dumbell") &&
          !exercise.equipment.includes("box"))
      ) {
        exercise.minReps = 30;
        exercise.maxReps = 90;
      } else if (exercise.subcategory.includes("locomotion_abs")) {
        exercise.minReps = 30;
        exercise.maxReps = 90;
      }

      if (chosenGoal.includes("strength")) {
        if (
          exercise.equipment.includes("hexbar") ||
          exercise.equipment.includes("barbell") ||
          exercise.equipment.includes("box")
        ) {
          exercise.minReps = 4;
          exercise.maxReps = 6;
        } else if (
          (exercise.subcategory.includes("side_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("low_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("knee_flexed_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("box"))
        ) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else if (exercise.subcategory.includes("locomotion_abs")) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else {
          exercise.minReps = 8;
          exercise.maxReps = 12;
        }
      }

      if (chosenGoal.includes("posture")) {
        if (exercise.equipment.includes("box")) {
          exercise.minReps = 4;
          exercise.maxReps = 6;
        } else if (
          (exercise.subcategory.includes("side_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("foamroller") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("low_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("foamroller") &&
            !exercise.equipment.includes("box")) ||
          (exercise.subcategory.includes("knee_flexed_abs") &&
            !exercise.equipment.includes("yogaball") &&
            !exercise.equipment.includes("miniband") &&
            !exercise.equipment.includes("kettlebell") &&
            !exercise.equipment.includes("dumbell") &&
            !exercise.equipment.includes("foamroller") &&
            !exercise.equipment.includes("box"))
        ) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else if (exercise.subcategory.includes("locomotion_abs")) {
          exercise.minReps = 30;
          exercise.maxReps = 90;
        } else if (
          exercise.equipment.includes("bodyweight") ||
          exercise.equipment.includes("miniband") ||
          exercise.equipment.includes("yogaball")
        ) {
          exercise.minReps = 8;
          exercise.maxReps = 12;
        } else if (
          exercise.equipment.includes("dumbbell") ||
          exercise.equipment.includes("kettlebell") ||
          exercise.equipment.includes("hexbar") ||
          exercise.equipment.includes("barbell") ||
          exercise.equipment.includes("cable")
        ) {
          exercise.minReps = 6;
          exercise.maxReps = 8;
        }
        exercise.minIsometric = 0;
        exercise.maxIsometric = 3;
        exercise.minEccentric = 0;
        exercise.maxEccentric = 3;
      }
      exercise.reps =
        //review if this is the right equiation to do this
        Math.floor(Math.random() * (exercise.maxReps - exercise.minReps + 1)) +
        exercise.minReps;
      exercise.isometric =
        Math.floor(
          Math.random() * (exercise.maxIsometric - exercise.minIsometric + 1)
        ) + exercise.minIsometric;
      exercise.eccentric =
        Math.floor(
          Math.random() * (exercise.maxEccentric - exercise.minEccentric + 1)
        ) + exercise.minEccentric;

      if (changeState === true) {
        setChangeState(false);
      } else if (changeState === false) {
        setChangeState(true);
      }
    });
  };

  useEffect(() => {}, [changeState]);

  ////////////////////////////////////////////////////////////////////////////////////
  //need to eventually add changes to this, refer to assignSplitWorkout
  const assignFullBodyExercise = () => {
    let addExercise = 0;
    let newDisplayExercises = [];

    console.log("full body exercise running");

    for (let i = filteredExercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredExercises[i], filteredExercises[j]] = [
        filteredExercises[j],
        filteredExercises[i],
      ];
    }

    for (let i = 0; i < fullBodySplit.length; i++) {
      const innerArray = fullBodySplit[i];
      for (let j = 0; j < innerArray.length; j++) {
        const categoryToCheck = innerArray[j];

        for (let k = 0; k < filteredExercises.length; k++) {
          if (addExercise > 0) {
            k++;
            addExercise = 0;
            if (k == innerArray.length + 1) {
              break;
            } else {
              continue;
            }
          }

          const exercise = filteredExercises[k];
          if (exercise.category.includes(categoryToCheck) && addExercise == 0) {
            newDisplayExercises.push(exercise);
            filteredExercises.splice(k, 1);
            addExercise += 1;
            break;
          } else {
            continue;
          }
        }
      }
    }
    console.log("DISPLAY EXERCISES", newDisplayExercises);
    setDisplayExercises(newDisplayExercises);
  };

  const assignSplitWorkout = () => {
    let addExercise = 0;
    let newDisplayExercises = [];

    for (let i = 0; i < chosenSplit.length; i++) {
      const innerArray = chosenSplit[i];
      for (let j = 0; j < innerArray.length; j++) {
        const categoryToCheck = innerArray[j];

        for (let k = 0; k < filteredExercises.length; k++) {
          if (addExercise > 0) {
            k++;
            addExercise = 0;
            if (k == innerArray.length + 1) {
              break;
            } else {
              continue;
            }
          }
          const exercise = filteredExercises[k];
          if (
            exercise.subcategory.includes(categoryToCheck) &&
            addExercise == 0
          ) {
            newDisplayExercises.push(exercise);
            filteredExercises.splice(k, 1);
            addExercise += 1;
            break;
          } else {
            continue;
          }
        }
      }
    }
    console.log("DISPLAY EXERCISES", newDisplayExercises);

    setDisplayExercises(newDisplayExercises);
  };

  useEffect(() => {
    assignReps(displayExercises);
    assignReps(warmUpExercises);
  }, [displayExercises]);

  ////////////////////////////////////////////////////////////////////////////////////
  //FUNCTION 3
  //FILTER ALL THE EXERICSES THAT MATCH GOAL, EXPERIENCE, AND LOCATION

  const filterExercises = () => {
    const possibleFilteredExercises = [];

    console.log("filterexercises running");

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      if (
        exercise.workout_location.includes(chosenLocation) &&
        exercise.fitness_goal.includes(chosenGoal) &&
        exercise.experience_level.includes(chosenExperience)
      ) {
        possibleFilteredExercises.push(exercise);
      }
    }

    for (let j = 0; j < assignedWarmUpExercises.length; j++) {
      const exercise = assignedWarmUpExercises[j];
      for (let k = 0; k < possibleFilteredExercises.length; k++) {
        const possibleExercise = possibleFilteredExercises[k];
        if (exercise.name === possibleExercise.name) {
          possibleFilteredExercises.splice(k, 1);
        }
      }
    }

    setFilteredExercises(possibleFilteredExercises);
    setWarmUpExercises(assignedWarmUpExercises);

    setTriggerNextFunction(true);
  };

  useEffect(() => {
    if (filteredExercises.length > 0) {
      if (responseState.preferredSplit === "Full Body") {
        assignFullBodyExercise();
      } else {
        assignSplitWorkout();
      }
    }
  }, [triggerNextFunction]);

  ////////////////////////////////////////////////////////////////////////////////////
  //FUNCTION ONE
  //ASSIGN THE RIGHT WORKOUT STRUCTURE BASED ON responseState.preferredSplit
  const assignSplit = () => {
    console.log("ONE: assign split running");
    if (responseState.preferredSplit == "Upper Body") {
      setChosenSplit(upperBodySplit);
      console.log("split assigned- upper");
    } else if (responseState.preferredSplit == "Lower Body") {
      setChosenSplit(lowerBodySplit);
      console.log("split assigned- lower");
    } else if (responseState.preferredSplit == "Full Body") {
      setChosenSplit(fullBodySplit);
      console.log("split assigned- full");
    }

    if (filteredExercises.length >= 8) {
      console.log("TWO: FilteredExercises greater than 8");
      //if there are enough exercises in the filtered workout, then use those to make a new workout
      setFilteredExercises([]);
      setFilterWarmupExercises([]);

      //increase this number later to 20 when more data is added
      if (responseState.preferredSplit === "Full Body") {
        assignFullBodyExercise();
        createWarmUpExercises();
      } else if (
        responseState.preferredSplit === "Upper Body" ||
        responseState.preferredSplit === "Lower Body"
      ) {
        createWarmUpExercises();
        assignSplitWorkout();
      }
      //if there is not enough exercises to create a workout, start from the top
      //increase this number later to 20 when more data is added
    } else if (filteredExercises.length < 8) {
      console.log(filteredExercises.length);
      console.log("TWO: Filtered Exercises less than 8");
      setTriggerCreateWarmUp(false);
      filterWarmUpExercises();
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////
  // generate warm up exercises

  const createWarmUpExercises = () => {
    console.log("create warmup running");
    const chosenWarmUpExercises = [];
    const categoriesToMatch = [
      "lower_body_posterior",
      "core",
      "upper_body_posterior",
    ];

    for (const category of categoriesToMatch) {
      for (let k = 0; k < filterWarmupExercises.length; k++) {
        const exercise = filterWarmupExercises[k];
        if (exercise.category.includes(category)) {
          chosenWarmUpExercises.push(exercise);
          filterWarmupExercises.splice(k, 1);
          k--;
          break; // Stop searching for exercises in this category after finding one
        }
      }
    }

    assignedWarmUpExercises = chosenWarmUpExercises;

    //adjust this when I adjust the others like this to make sure they're triggering together
    if (filteredExercises.length < 8) {
      filterExercises();
    } else if (filteredExercises.length >= 8) {
      setWarmUpExercises(assignedWarmUpExercises);
    }
  };

  const filterWarmUpExercises = () => {
    const confirmedExercises = [];

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      if (
        exercise.can_be_warmup === true &&
        exercise.experience_level.includes("beginner")
      ) {
        confirmedExercises.push(exercise);
      }
    }
    console.log(
      "filtered possible warm up exercises",
      confirmedExercises.length
    );

    setFilterWarmupExercises(confirmedExercises);

    console.log("triggercreate warm up");
    setTriggerCreateWarmUp(true);
  };

  useEffect(() => {
    if (filterWarmupExercises.length > 8 && triggerCreateWarmUp === true) {
      //if filtered warm up exercises is less than 8 and triggercreate warm up is true
      //changed it to greater than to see if that would help
      console.log(
        "FOUR: useeffect is running",
        "triggercreatewarm up",
        triggerCreateWarmUp,
        "filter warm up exercises length",
        filterWarmupExercises.length
      );
      createWarmUpExercises();
    }
  }, [triggerCreateWarmUp]);

  ////////////////////////////////////////////////////////////////////////////////////
  /// generate new workout if user does not like the one that was created
  const generateNewWorkout = () => {
    setTriggerCreateWarmUp(false);
    setTriggerNextFunction(false);
    setDisplayExercises([]);
    setWarmUpExercises([]);
    assignSplit();
  };

  ////////////////////////////////////////////////////////////////////////////////////
  // save the workout to async storage
  const saveWorkout = async () => {
    console.log("save workout button pressed");
    if (workoutName.trim() === "") {
      Alert.alert("Error", "You must enter a workout name");
      return;
    }

    const newWorkout = {
      newWorkoutID: Math.floor(Math.random() * 10000000),
      title: workoutName,
      warmUp: warmUpExercises,
      displayExercises: displayExercises,
    };

    try {
      await AsyncStorage.setItem(workoutName, JSON.stringify(newWorkout));
      setSavedWorkouts([...savedWorkouts, newWorkout]);
    } catch (error) {
      console.error("Error saving workout:", error);
    }

    if (!workoutIsSaved) {
      setWorkoutIsSaved(true);
    }
  };

  const viewSavedWorkouts = () => {
    console.log("go to view workouts button triggering");
    navigation.navigate("ViewWorkout", {});

    setWorkoutIsSaved(false);
    setDisplayExercises([]);

    setFilteredExercises([]);
    setChangeState(false);
    setTriggerNextFunction(false);
    setTriggerCreateWarmUp(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!splitAssigned) {
      setSplitAssigned(false);
      assignSplit();
      setSplitAssigned(true);
      totalCount += 1;
    }
  }, [splitAssigned]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      {displayExercises.length > 0 ? (
        <View>
          <WarmUpList warmUpExercises={warmUpExercises} />
          <ExerciseList displayExercises={displayExercises} />
          {!workoutIsSaved ? (
            <>
              <PrimaryButton onPress={() => generateNewWorkout()}>
                New workout
              </PrimaryButton>

              <PrimaryButton onPress={toggleModal}>Save workout</PrimaryButton>
              <Modal visible={modalVisible} animationType="slide">
                <WorkoutTextInput
                  workoutIsSaved={workoutIsSaved}
                  workoutName={workoutName}
                  setWorkoutName={setWorkoutName}
                />

                <PrimaryButton onPress={() => saveWorkout()}>
                  Save Name
                </PrimaryButton>
              </Modal>
            </>
          ) : (
            <PrimaryButton onPress={() => viewSavedWorkouts()}>
              Go to Saved Workouts
            </PrimaryButton>
          )}
        </View>
      ) : (
        <>
          <Text>No exercises to view.</Text>
          <Text>Try restarting the app</Text>
        </>
      )}
    </View>
  );
}

export default GenerateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.coolThird,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  category: {
    flex: 1,
    color: "#666",
  },
  subcategory: {
    flex: 1,
    color: "#666",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

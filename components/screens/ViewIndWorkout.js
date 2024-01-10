import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PrimaryButton from "../UI/buttons/PrimaryButton";
import WarmUpExercise from "../UI/other/ViewIndWorkoutComponents/WarmUpExercise";
import WorkoutExercise from "../UI/other/ViewIndWorkoutComponents/WorkoutExercise";
import NotesSection from "../UI/other/ViewIndWorkoutComponents/NotesSection";
import Timer from "../UI/other/ViewIndWorkoutComponents/Timer";
import WorkoutModal from "../UI/other/ViewIndWorkoutComponents/WorkoutModal";

import Colors from "../constants/Colors";

//3 of the errors are coming from here
function ViewIndWorkout({ navigation, route }) {
  const { workout, savedWorkouts } = route.params;

  console.log("----savedworkouts from view ind workout", savedWorkouts);

  const [warmUpReps, setWarmUpReps] = useState({});
  const [workoutReps, setWorkoutReps] = useState({});
  const [notes, setNotes] = useState("");

  const [workoutIsStarted, setWorkoutIsStarted] = useState(false);
  const [modal, setModal] = useState(false);
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [healthDataAnswers, setHealthDataAnswers] = useState([]);

  // view in workout holds the data
  //need to make sure it's properly getting sent from questions to modla to view ind workout, then being saved to local storage
  const [energyState, setEnergyState] = useState(null);
  const [motivationState, setMotivationState] = useState(null);
  const [tirednessState, setTirednessState] = useState(null);

  const passingSavedWorkouts = savedWorkouts;

  let key = "HealthData";

  useEffect(() => {
    // This will run when the component mounts
    retrieveData();
  }, []);

  //the values for reps reset when the workout is opened

  const saveReps = async () => {
    try {
      console.log("Saving reps and notes for workout title:", workout.title);

      await AsyncStorage.setItem(
        `warmUpReps_${workout.title}`,
        JSON.stringify(warmUpReps)
      );
      await AsyncStorage.setItem(
        `workoutReps_${workout.title}`,
        JSON.stringify(workoutReps)
      );
      await AsyncStorage.setItem(
        `notes_${workout.title}`,
        JSON.stringify(notes)
      );
      console.log("Reps and notes saved successfully.");
    } catch (error) {
      console.log("Error saving reps and notes:", error);
    }
  };

  const handleWarmUpRepsChange = (exerciseName, reps) => {
    setWarmUpReps((prevReps) => ({
      ...prevReps,
      [exerciseName]: reps,
    }));
  };

  const handleWorkoutRepsChange = (exerciseName, reps) => {
    setWorkoutReps((prevReps) => ({
      ...prevReps,
      [exerciseName]: reps,
    }));
  };

  const retrieveData = async () => {
    console.log("attempting the retrieve the data for reps and notes");
    try {
      const warmUpRepsData = await AsyncStorage.getItem(
        `warmUpReps_${workout.title}`
      );
      const workoutRepsData = await AsyncStorage.getItem(
        `workoutReps_${workout.title}`
      );
      const notesData = await AsyncStorage.getItem(`notes_${workout.title}`);

      console.log("Warm Up Reps Data:", warmUpRepsData);
      console.log("Workout Reps Data:", workoutRepsData);
      console.log("Notes Data:", notesData);

      if (warmUpRepsData !== null) {
        setWarmUpReps(JSON.parse(warmUpRepsData));
      }
      if (workoutRepsData !== null) {
        setWorkoutReps(JSON.parse(workoutRepsData));
      }
      if (notesData !== null) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.log("there be an error retrieving the data, mste:", error);
    }
  };

  useEffect(() => {
    saveReps();
  }, [warmUpReps, workoutReps, notes]);

  //////////////////////////////////////////////////////

  useEffect(() => {
    navigation.setParams({ elapsedTime });
  }, [elapsedTime]);

  //////////////////////////////////////////////////////

  const startWorkout = () => {
    // retrieveData();
    setModal(true);
    setWorkoutIsStarted(true);
    setStartTime(Date.now());
  };

  const endWorkout = () => {
    setModal(false);
    setWorkoutIsStarted(false);
    clearInterval(timer);
    setStartTime(null);

    setEnergyState(null);
    setMotivationState(null);
    setTirednessState(null);
  };

  const closeModal = () => {
    setModal(false);
  };

  const saveAnswers = async () => {
    const healthDataStats = {
      dataKey: Math.floor(Math.random() * 10000000),
      dayOfWeek: new Date()
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .split(", ")[0],
      theDate:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      energyState: energyState,
      motivationState: motivationState,
      tirednessState: tirednessState,
    };

    try {
      const existingData = await AsyncStorage.getItem(key);
      const newData = JSON.parse(existingData) || [];
      const updatedData = [...newData, healthDataStats];
      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      setHealthDataAnswers(updatedData);
      console.log("---------------- Answers saved successfully.");
    } catch (error) {
      console.error("Error saving workout:", error);
    }

    ////////////////////////////////////////////////////

    closeModal();
    startTimer();
  };

  // console.log(
  //   "+++++++++++ this is savedAnswers +++++++++++",
  //   healthDataAnswers
  // );

  const startTimer = () => {
    const interval = setInterval(() => {
      if (startTime) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 3000);
        setElapsedTime(elapsedTime);
      }
      console.log("timer");
    }, 3000);
    setTimer(interval);
  };

  const goToViewWorkout = () => {
    navigation.navigate("ViewWorkout", { passingSavedWorkouts });
    console.log("!!!!!!!!!! this is savedAnswers THREE", healthDataAnswers);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        {workoutIsStarted ? (
          <View>
            <Text style={styles.workoutButton} onPress={endWorkout}>
              End workout
            </Text>
            <Timer startTime={startTime} />
          </View>
        ) : (
          <Text style={styles.workoutButton} onPress={startWorkout}>
            Start workout
          </Text>
        )}
      </View>
      <PrimaryButton onPress={goToViewWorkout}>Back</PrimaryButton>

      <WorkoutModal
        modal={modal}
        setModal={setModal}
        energyState={energyState}
        motivationState={motivationState}
        tirednessState={tirednessState}
        setEnergyState={setEnergyState}
        setMotivationState={setMotivationState}
        setTirednessState={setTirednessState}
        saveAnswers={saveAnswers}
        closeModal={closeModal}
      />

      {workout &&
      Array.isArray(workout.displayExercises) &&
      workout.displayExercises.length > 0 ? (
        <>
          <View style={styles.warmUpContainer}>
            <Text style={styles.warmUpTitle}>Warm-up Exercises:</Text>
            {workout.warmUp.map((exercise) => (
              <WarmUpExercise
                key={exercise.name}
                exercise={exercise}
                warmUpReps={warmUpReps}
                handleWarmUpRepsChange={handleWarmUpRepsChange}
              />
            ))}
          </View>
          <View style={styles.workoutContainer}>
            <>
              <Text style={styles.workOutTitle}>Workout Exercises:</Text>
            </>
            <View style={styles.innerWorkoutContainer}>
              {workout.displayExercises.map((exercise) => (
                <WorkoutExercise
                  key={exercise.name}
                  exercise={exercise}
                  workoutReps={workoutReps}
                  handleWorkoutRepsChange={handleWorkoutRepsChange}
                />
              ))}
            </View>
          </View>
        </>
      ) : (
        <Text>No exercises found.</Text>
      )}

      <NotesSection notes={notes} setNotes={setNotes} />

      <View style={styles.bufferContainer}></View>
    </ScrollView>
  );
}

export default ViewIndWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F7F2FE",
    fontSize: 20,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  warmUpContainer: {
    marginLeft: 50,
    marginRight: 31,
  },

  workoutContainer: {
    paddingTop: 30,
    marginLeft: 50,
    marginRight: 30,
  },

  innerWorkoutContainer: {
    paddingTop: 20,
  },
  workoutButton: {
    backgroundColor: Colors.coolPrimary,
    borderColor: "#628899",
    borderWidth: 1,
    width: "90%",
    height: 120,
    elevation: 2,
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 45,
    margin: 10,
    marginBottom: 30,
    marginTop: 30,
    fontSize: 20,
  },
  workOutTitle: { fontSize: 20, textAlign: "center", paddingBottom: 15 },
  warmUpTitle: { fontSize: 20, textAlign: "center", paddingBottom: 15 },
  bufferContainer: {
    height: 100,
  },
});

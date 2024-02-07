import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

import FifthButton from "../../buttons/FifthButton";

function WorkoutExercise({ exercise, handleWorkoutRepsChange, workoutReps }) {
  const [showVideo, setShowVideo] = useState(false);

  const handleViewButtonPress = () => {
    if (showVideo === true) {
      setShowVideo(false);
    } else if (showVideo === false) {
      setShowVideo(true);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    // need to rework the show video trigger
    <View>
      <View key={exercise.name} style={styles.container}>
        <View style={styles.leftSide}>
          <View style={styles.topBox}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>

          <View style={styles.bottomBox}>
            <Text style={styles.exerciseEquipment}>
              Equipment: {exercise.equipment}
            </Text>

            {exercise.exercise_cues > 0 ? (
              <>
                <Text style={styles.exerciseCues}>{exercise.cues}</Text>
              </>
            ) : (
              <>
                <Text>no cues, sorry</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.rightSide}>
          <Text style={styles.exerciseReps}>{exercise.reps}</Text>

          <TextInput
            placeholder="EL WEIGHT"
            style={styles.repInput}
            onChangeText={(text) => handleWorkoutRepsChange(exercise.id, text)}
            value={workoutReps[exercise.id] || ""}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FifthButton onPress={handleViewButtonPress}>
          {/* //get link to open in new tab */}
          <Text onClick={() => openInNewTab(exercise.video)}>
            Watch Demo Video
          </Text>
          {/* {showVideo ? "Close" : "Show"} */}
        </FifthButton>
        {/* {showVideo && <VideoPlayer videoUri={exercise.video} />} */}
      </View>
    </View>
  );
}

export default WorkoutExercise;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
  },

  leftSide: {
    flexDirection: "column",
  },
  rightSide: {
    flexDirection: "row",
    height: 30,
    width: 90,
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 30,
    alignItems: "center",
  },
  repInput: {
    fontSize: 15,
    lineHeight: 10,
    borderColor: "#333",
    borderWidth: 1,
    elevation: 1,
    width: 40,
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  exerciseName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  exerciseEquipment: {
    fontSize: 15,
  },
  exerciseCues: {
    fontSize: 15,
  },
  exerciseReps: {
    fontSize: 15,
  },
});

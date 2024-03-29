import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

import FifthButton from "../../buttons/FifthButton";

function WarmUpExercise({ exercise, warmUpReps, handleWarmUpRepsChange }) {
  const [showVideo, setShowVideo] = useState(false);

  const handleViewButtonPress = () => {
    if (showVideo === true) {
      setShowVideo(false);
    } else if (showVideo === false) {
      setShowVideo(true);
    }
  };

  return (
    <View style={styles.bigContainer}>
      <View key={exercise.name} style={styles.container}>
        <View style={styles.leftSide}>
          <View style={styles.topBox}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>

          <View style={styles.bottomBox}>
            <Text style={styles.exerciseEquipment}>
              Equipment: {exercise.equipment}
            </Text>
            {exercise.exercise_cues.length > 0 ? (
              <Text style={styles.exerciseCues}>Cues: {exercise.cues}</Text>
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
            placeholder="weight/band"
            style={styles.repInput}
            onChangeText={(text) => handleWarmUpRepsChange(exercise.id, text)}
            value={warmUpReps[exercise.id] || ""}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FifthButton onPress={handleViewButtonPress}>
          {showVideo ? "Close" : "Show"}
        </FifthButton>
        {showVideo && <VideoPlayer videoUri={exercise.videoUri} />}
      </View>
    </View>
  );
}

export default WarmUpExercise;

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: "column",
  },
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

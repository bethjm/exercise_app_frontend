import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import FourthButton from "../../buttons/FourthButton";

function QuestionsSection({
  energyState,
  motivationState,
  tirednessState,
  setEnergyState,
  setMotivationState,
  setTirednessState,
}) {
  const [energyPressedTrue, setEnergyPressedTrue] = useState(false);
  const [energyPressedFalse, setEnergyPressedFalse] = useState(false);

  const [motivationPressedTrue, setMotivationPressedTrue] = useState(false);
  const [motivationPressedFalse, setMotivationPressedFalse] = useState(false);

  const [tirednessPressedTrue, setTirednessPressedTrue] = useState(false);
  const [tirednessPressedFalse, setTirednessPressedFalse] = useState(false);

  const handleEnergyPressTrue = () => {
    setEnergyState(true);
    setEnergyPressedTrue(!energyPressedTrue);

    if (energyPressedFalse === true) {
      setEnergyPressedFalse(false);
    }
  };

  const handleEnergyPressFalse = () => {
    setEnergyState(false);
    setEnergyPressedFalse(!energyPressedFalse);

    if (energyPressedTrue === true) {
      setEnergyPressedTrue(false);
    }
  };

  const handleMotivationPressTrue = () => {
    setMotivationState(true);
    setMotivationPressedTrue(!motivationPressedTrue);

    if (motivationPressedFalse === true) {
      setMotivationPressedFalse(false);
    }
  };

  const handleMotivationPressFalse = () => {
    setMotivationState(false);
    setMotivationPressedFalse(!motivationPressedFalse);

    if (motivationPressedTrue === true) {
      setMotivationPressedTrue(false);
    }
  };

  const handleTirednessPressTrue = () => {
    setTirednessState(true);
    setTirednessPressedTrue(!tirednessPressedTrue);

    if (tirednessPressedFalse === true) {
      setTirednessPressedFalse(false);
    }
  };

  const handleTirednessPressFalse = () => {
    setTirednessState(false);
    setTirednessPressedFalse(!tirednessPressedFalse);

    if (tirednessPressedTrue === true) {
      setTirednessPressedTrue(false);
    }
  };

  const energyButtonStyleTrue = {
    backgroundColor: energyPressedTrue ? "#EE7FC8" : "#EEB3C8",
  };

  const energyButtonStyleFalse = {
    backgroundColor: energyPressedFalse ? "#EE7FC8" : "#EEB3C8",
  };

  const motivationButtonStyleTrue = {
    backgroundColor: motivationPressedTrue ? "#EE7FC8" : "#EEB3C8",
  };

  const motivationButtonStyleFalse = {
    backgroundColor: motivationPressedFalse ? "#EE7FC8" : "#EEB3C8",
  };

  const tirednessButtonStyleTrue = {
    backgroundColor: tirednessPressedTrue ? "#EE7FC8" : "#EEB3C8",
  };

  const tirednessButtonStyleFalse = {
    backgroundColor: tirednessPressedFalse ? "#EE7FC8" : "#EEB3C8",
  };

  // need to make it so that the answers get sent to modal, then view ind workout when the save button is pressed

  console.log(
    "FROM QUESTION SECTION",
    "energyState-",
    energyState,
    "motivationState-",
    motivationState,
    "tirednessState-",
    tirednessState
  );
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.questionHeader}>Wellness Check In</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionQuestion}>Do you feel energized?</Text>
        <View style={styles.buttonContainer}>
          <FourthButton
            onPress={() => handleEnergyPressTrue(true)}
            style={[styles.button, energyButtonStyleTrue]}
          >
            Yes
          </FourthButton>
          <FourthButton
            onPress={() => handleEnergyPressFalse(false)}
            style={[styles.button, energyButtonStyleFalse]}
          >
            No
          </FourthButton>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionQuestion}>Do you feel motivated?</Text>
        <View style={styles.buttonContainer}>
          <FourthButton
            onPress={() => handleMotivationPressTrue(true)}
            style={[styles.button, motivationButtonStyleTrue]}
          >
            Yes
          </FourthButton>
          <FourthButton
            onPress={() => handleMotivationPressFalse(false)}
            style={[styles.button, motivationButtonStyleFalse]}
          >
            No
          </FourthButton>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionQuestion}>Do you feel fatigued?</Text>
        <View style={styles.buttonContainer}>
          <FourthButton
            onPress={() => handleTirednessPressTrue(true)}
            style={[styles.button, tirednessButtonStyleTrue]}
          >
            Yes
          </FourthButton>
          <FourthButton
            onPress={() => handleTirednessPressFalse(false)}
            style={[styles.button, tirednessButtonStyleFalse]}
          >
            No
          </FourthButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 200,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
  },
  questionQuestion: {
    fontSize: 20,
    paddingBottom: 15,
    paddingTop: 20,
  },
  questionHeader: {
    fontSize: 20,
    paddingBottom: 15,
    fontWeight: "bold",
  },
});

export default QuestionsSection;

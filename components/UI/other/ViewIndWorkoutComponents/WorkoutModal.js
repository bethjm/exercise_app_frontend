import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import QuestionsSection from "./QuestionsSection";

import FifthButton from "../../buttons/FifthButton";

function WorkoutModal({
  modal,
  setModal,
  energyState,
  motivationState,
  tirednessState,
  setEnergyState,
  setMotivationState,
  setTirednessState,
  saveAnswers,
  closeModal,
}) {
  return (
    <Modal visible={modal} animationType="slide">
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#F7F2FE",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => closeModal()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>

        <QuestionsSection
          energyState={energyState}
          motivationState={motivationState}
          tirednessState={tirednessState}
          setEnergyState={setEnergyState}
          setMotivationState={setMotivationState}
          setTirednessState={setTirednessState}
        />
        <View style={styles.buttonContainer}>
          <FifthButton onPress={() => saveAnswers()} style={styles.saveButton}>
            <Text>Save answers</Text>
          </FifthButton>
        </View>
      </View>
    </Modal>
  );
}

export default WorkoutModal;
const styles = StyleSheet.create({
  timerText: {
    fontSize: 20,
  },
  buttonContainer: {
    paddingTop: 30,
    alignItems: "center",
  },
  closeButton: {
    justifyContent: "flex-end",
    marginLeft: 30,
  },
  saveButton: {
    backgroundColor: "#A4C3D1",
    borderColor: "#42a6d4",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

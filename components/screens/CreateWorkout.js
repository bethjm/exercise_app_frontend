import { StyleSheet, Text, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import PrimaryButton from "../UI/buttons/PrimaryButton";
import Question from "../UI/other/Quiz/Question";
import Answers from "../UI/other/Quiz/Answers";
import GenerateScreen from "./GenerateScreen";
import Colors from "../constants/Colors";
import createQuiz from "../API/CreateQuestions";

function CreateWorkout({ navigation, route }) {
  console.log("create workout opened");
  // notes to self:
  // dont forget to eventually reset the quiz results. maybe pass to Homepage and clear when create is clicked?
  // allow total of 5 workouts to be made. Store the current 5 and latest 5 to make sure there's no repeat in exercises
  let { exercises } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responseState, setResponseState] = useState({
    location: "",
    experienceLevel: "",
    goals: "",
    preferredSplit: "",
    throwAway: "",
  });

  const handleNextQuestion = (selectedAnswer) => {
    const currentQuestion = createQuiz[currentQuestionIndex];
    const answerIndex = currentQuestion.options.indexOf(selectedAnswer);
    const matchingValue = currentQuestion.match_api[answerIndex];
    // const splitType = currentQuestion.splitType[answerIndex];

    if (currentQuestion.type === "Location") {
      setResponseState({
        ...responseState,
        location: matchingValue,
      });
    } else if (currentQuestion.type === "Experience Level") {
      setResponseState({
        ...responseState,
        experienceLevel: matchingValue,
      });
    } else if (currentQuestion.type === "Goal") {
      setResponseState({
        ...responseState,
        goals: matchingValue,
      });
    } else if (currentQuestion.type === "Split") {
      setResponseState({
        ...responseState,
        preferredSplit: selectedAnswer,
      });
    } else if (currentQuestion.type === "Throw Away") {
      console.log("throw away");
    }

    if (currentQuestionIndex < createQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // console.log("Response State", responseState);
      goToGenerateScreen(responseState);
    }

    // console.log("-----------------");
    // console.log("Location:", responseState.location);
    // console.log("Experience Level:", responseState.experienceLevel);
    // console.log("Goals:", responseState.goals);
    // console.log("Preferred Split:", responseState.preferredSplit);
  };

  const goToGenerateScreen = async (selectedAnswers) => {
    navigation.navigate("GenerateScreen", {
      exercises: exercises,
      responseState: responseState,
    });

    // try {
    //   await AsyncStorage.setItem(splitAssigned, JSON.stringify("false"));
    //   console.log("setSplitAssigned saved");
    // } catch (error) {
    //   console.error("Error saving workout:", error);
    // }
  };
  //the system is mad about this, but it is working- it is not workign anymore

  return (
    <View style={styles.container}>
      {createQuiz.length > 0 && (
        <>
          <Question
            questionText={createQuiz[currentQuestionIndex].questionText}
          />
          <FlatList
            data={createQuiz[currentQuestionIndex].options}
            renderItem={({ item, index }) => (
              <Answers
                onPress={() => handleNextQuestion(item)}
                answerText={item}
                key={index}
              />
            )}
            keyExtractor={(item) => item.toString()}
          />
        </>
      )}
    </View>
  );
}

export default CreateWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "Colors.coolSecondary",
  },
});

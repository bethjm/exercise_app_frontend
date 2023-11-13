import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "./components/UI/buttons/PrimaryButton";
import Colors from "./components/constants/Colors";
import LandingPage from "./components/screens/LandingPage";

import NavBar from "./NavBar";

function HomePage() {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://10.0.2.2:8000/api/")
      // "http://10.0.2.2:8000/api/"
      // http://localhost:8000/api/
      // [Error: Network response was not ok] means successfully talked to the database and the database is saying no
      // [TypeError: Network request failed] means it did not successfully talk to the database.
      .then((response) => {
        if (!response.ok) {
          throw new Error("The Network response is not ok and neither am I");
        }
        return response.json();
      })
      .then((exercises) => {
        // console.log("Fetched exercises:", exercises);
        setExercises(exercises);
      })
      .catch((error) => {
        console.error("There be an Error fetching data: ", error);
      });
  }, []);

  if (exercises.length <= 0) {
    console.log("loading");
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  console.log(exercises.length);

  return (
    <View style={styles.container}>
      <LandingPage exercises={exercises} />
      <NavBar />
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
});

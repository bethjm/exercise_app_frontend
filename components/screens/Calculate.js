import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../UI/buttons/PrimaryButton";

function Calculate() {
  const navigation = useNavigation();

  const [savedHealthData, setSavedHealthData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [fatigueData, setFatigueData] = useState([]);
  const [motivationData, setMotivationData] = useState([]);
  const [indexData, setIndexData] = useState([]);

  useEffect(() => {
    const getSavedHealthData = async () => {
      try {
        const healthDataKeys = await AsyncStorage.getAllKeys();
        const filteredKeys = healthDataKeys.filter((key) =>
          key.includes("HealthData")
        );
        const savedHealthDataArray = await AsyncStorage.multiGet(filteredKeys);

        const parsedData = savedHealthDataArray.map((data) =>
          JSON.parse(data[1])
        );
        console.log("parsed data===========", parsedData);

        setSavedHealthData(parsedData);
      } catch (error) {
        console.error("Error retrieving saved data:", error);
      }
    };
    console.log("get saved health data called");
    getSavedHealthData();
  }, []);

  ///////// /////////// ///////// //////// /////// ////// ////////

  useEffect(() => {
    const createLineChartData = () => {
      console.log("!!!!!!!!!!!!! createLineChartData triggered");
      const newEnergyData = [];
      const newMotivationData = [];
      const newFatigueData = [];

      const energyDataPoint = [];
      const motivationDataPoint = [];
      const fatigueDataPoint = [];
      const indexDataPoint = [];

      console.log("saved health data", savedHealthData);

      for (let i = 0; i < savedHealthData.length; i++) {
        let insideSavedHealthData = savedHealthData[i];
        for (let j = 0; j < insideSavedHealthData.length; j++) {
          const energyInfo = insideSavedHealthData[j].energyState;
          const motivationInfo = insideSavedHealthData[j].motivationState;
          const fatigueInfo = insideSavedHealthData[j].tirednessState;

          newEnergyData.push(energyInfo);
          newMotivationData.push(motivationInfo);
          newFatigueData.push(fatigueInfo);
        }
      }

      newEnergyData.forEach((data) => {
        if (data === false) {
          energyDataPoint.push(1);
        } else {
          energyDataPoint.push(2);
        }
      });

      console.log("energy data point for loop", energyDataPoint);

      newMotivationData.forEach((data, i) => {
        if (data === false) {
          motivationDataPoint.push(1);
        } else {
          motivationDataPoint.push(2);
        }
      });

      //is it an issue with asyncronous updates? or is the info not updating ocrrectly?
      console.log("motivation data point for loop", motivationDataPoint);

      newFatigueData.forEach((data) => {
        if (data === false) {
          fatigueDataPoint.push(1);
        } else {
          fatigueDataPoint.push(2);
        }
      });

      for (let i = 1; i <= energyDataPoint.length; i++) {
        indexDataPoint.push(i);
      }

      console.log("fatigue data point for loop", fatigueDataPoint);
      setEnergyData(energyDataPoint);
      setMotivationData(motivationDataPoint);
      setFatigueData(fatigueDataPoint);
      setIndexData(indexDataPoint);
      console.log("after setting state in createLineChartData");
    };
    createLineChartData();
  }, [savedHealthData]);

  ///////// /////////// ///////// //////// /////// ////// ////////

  const goToHealthData = () => {
    navigation.navigate("HealthData", {
      energyData: energyData,
      motivationData: motivationData,
      fatigueData: fatigueData,
      indexData: indexData,
    });
  };

  const goToHomePage = () => {
    navigation.navigate("HomePage", {});
  };

  return (
    <View style={styles.container}>
      <PrimaryButton onPress={goToHealthData}>
        <Text>Calculate Data</Text>
      </PrimaryButton>
      <View style={styles.buttonBarrier}>
        <PrimaryButton onPress={goToHomePage}>
          <Text>Back</Text>
        </PrimaryButton>
      </View>
    </View>
  );
}

export default Calculate;

const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
    paddingLeft: 100,
  },
  buttonBarrier: {
    paddingTop: 20,
  },
});

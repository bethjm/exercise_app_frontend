import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart, LineChart } from "react-native-chart-kit";
import { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import NavBar from "../../NavBar";
import PrimaryButton from "../UI/buttons/PrimaryButton";

const HealthData = ({ route }) => {
  const { energyData, motivationData, fatigueData, indexData } = route.params;

  const [barChartData, setBarChartData] = useState(null);
  const [savedHealthData, setSavedHealthData] = useState([]);

  const navigation = useNavigation();

  const dayOfWeekCounts = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  ///////////////////////////////////////////////////////

  useEffect(() => {
    const getSavedHealthData = async () => {
      try {
        const healthDataKeys = await AsyncStorage.getAllKeys();
        const filteredKeys = healthDataKeys.filter((key) =>
          key.includes("HealthData")
        );
        const savedHealthDataArray = await AsyncStorage.multiGet(filteredKeys);
        // console.log("health data pulled down");

        const parsedData = savedHealthDataArray.map((data) =>
          JSON.parse(data[1])
        );

        setSavedHealthData(parsedData);
      } catch (error) {
        console.error("Error retrieving saved data:", error);
      }
    };

    getSavedHealthData();
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  ///TEST 2

  const lineChartData = {
    labels: indexData.map((data) => data.toString()),
    // ["asdas", "dfd", "assdfsds", "dsdfsdfd", "asdfs", "reted"],
    datasets: [
      {
        data: energyData.map((data) => data),
        // [1, 3, 5, 7, 9, 11],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: motivationData.map((data) => data),
        // [5, 4, 3, 2, 1, 7],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: fatigueData.map((data) => data),
        // [1, -12, 3, 19, 5, 6],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const calculateBarChart = () => {
    for (let i = 0; i < savedHealthData.length; i++) {
      let insideSavedHealthData = savedHealthData[i];
      for (let j = 0; j < insideSavedHealthData.length; j++) {
        const dayOfWeek = insideSavedHealthData[j].dayOfWeek;
        dayOfWeekCounts[dayOfWeek] += 1;
      }
    }

    // Convert dayOfWeekCounts object to an array
    const countsArray = Object.values(dayOfWeekCounts);

    // Replace NaN values with null
    const sanitizedCountsArray = countsArray.map((count) =>
      isNaN(count) ? null : count
    );

    // Create the bar chart data using the counts array
    const chartData = {
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: sanitizedCountsArray,
        },
      ],
    };

    setBarChartData(chartData);
  };

  useEffect(() => {
    calculateBarChart();
  }, [savedHealthData]);

  const goToHomePage = () => {
    navigation.navigate("HomePage", {});
  };

  ///////////////////////////////////////////////////////
  return indexData.length > 0 ? (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.daysOfWeekChart}>
          <Text style={styles.text}>Days of the week you workout</Text>
          {barChartData && (
            <BarChart
              data={barChartData}
              width={380}
              height={400}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#F7F2FE",
                backgroundGradientFrom: "#F7F2FE",
                backgroundGradientTo: "#F7F2FE",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>

        <View style={styles.correlationChart}>
          <Text style={styles.text}>Correlation equals causation?</Text>
          <Text style={styles.text}>Draw your own conclusions</Text>

          <LineChart
            data={lineChartData}
            width={380}
            height={400}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
            }}
          />

          <View style={styles.keyContainer}>
            <Text style={styles.keyTitle}>Key</Text>

            <View style={styles.energyContainer}>
              <Text style={styles.energyKey}>Energy</Text>
            </View>

            <View styles={styles.motivationContainer}>
              <Text style={styles.motivationKey}>Motivation</Text>
            </View>

            <View styles={styles.tirednessContainer}>
              <Text style={styles.tirednessKey}>Tiredness</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <NavBar />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>There is no data to view</Text>
      <Text>Try logging a workout and answering the questionarre</Text>
      <PrimaryButton onPress={goToHomePage}>Go To Home</PrimaryButton>
    </View>
  );
};

export default HealthData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 61,
    backgroundColor: "#F7F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  daysOfWeekChart: {
    paddingTop: 20,
  },
  correlationChart: {
    paddingTop: 20,
  },
  keyContainer: {
    borderColor: "#333",
    borderWidth: 2,
    alignItems: "center",
    width: 151,
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: 170,
  },
  keyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  energyContainer: {
    flexDirection: "row",
  },
  energyKey: {
    backgroundColor: "#C8BFD4",
    borderRadius: 5,
    lineHeight: 30,
    width: 100,
    textAlign: "center",
  },
  motivationContainer: {
    flexDirection: "row",
  },
  motivationKey: {
    backgroundColor: "#C8BFD4",
    borderRadius: 5,
    lineHeight: 30,
    width: 100,
    textAlign: "center",
  },
  tirednessContainer: {
    flexDirection: "row",
  },
  tirednessKey: {
    backgroundColor: "#C8BFD4",
    borderRadius: 5,
    lineHeight: 30,
    width: 100,
    textAlign: "center",
    marginBottom: 15,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    backgroundColor: "#f2f2f2",
  },
});

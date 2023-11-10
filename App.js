import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./HomePage";
import CreateWorkout from "./components/screens/CreateWorkout";
import ViewWorkout from "./components/screens/ViewWorkout";
import GenerateScreen from "./components/screens/GenerateScreen";
import ViewIndWorkout from "./components/screens/ViewIndWorkout";
import HealthData from "./components/screens/HealthData";
import NavBar from "./NavBar";
import NotesStyling from "./components/screens/NotesStyling";
import LandingPage from "./components/screens/LandingPage";
import StretchingVideos from "./components/UI/other/LandingPageComponents/StretchingVideos";
import IndVideo from "./components/UI/other/LandingPageComponents/IndVideo";
import Calculate from "./components/screens/Calculate";

import Colors from "./components/constants/Colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
          <Stack.Screen name="ViewWorkout" component={ViewWorkout} />
          <Stack.Screen name="GenerateScreen" component={GenerateScreen} />
          <Stack.Screen name="ViewIndWorkout" component={ViewIndWorkout} />
          <Stack.Screen name="HealthData" component={HealthData} />
          <Stack.Screen name="NavBar" component={NavBar} />
          <Stack.Screen name="NotesStyling" component={NotesStyling} />
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="StretchingVideos" component={StretchingVideos} />
          <Stack.Screen name="IndVideo" component={IndVideo} />
          <Stack.Screen name="Calculate" component={Calculate} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coolPrimary,
  },
});

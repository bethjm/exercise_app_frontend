import { StyleSheet, Text, View, Button } from "react-native";
import { Video } from "expo-av";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import StretchingVideoLinks from "../../../API/StretchingVideoLinks";
import SecondaryButton from "../../buttons/SecondaryButton";

function StretchingVideos() {
  const navigation = useNavigation();

  const goToIndStretch = () => {
    navigation.navigate("IndVideo", {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biiiiiig Stretch</Text>
      {StretchingVideoLinks.map((video) => (
        <View key={video.id}>
          <SecondaryButton onPress={() => goToIndStretch(video)}>
            <Text style={styles.title}>{video.title}</Text>
          </SecondaryButton>
        </View>
      ))}
    </View>
  );
}

export default StretchingVideos;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  header: {
    marginBottom: 10,
    fontSize: 25,
    width: "90%",
    fontWeight: "bold",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "10%",
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "30%",
    marginTop: 10,
  },
});

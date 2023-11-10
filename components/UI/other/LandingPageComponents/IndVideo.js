import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../buttons/PrimaryButton";

function IndVideo(video) {
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayButtonPress = () => {
    setIsPlaying(true);
  };

  const handlePauseButtonPress = () => {
    setIsPlaying(false);
  };

  const goToStretchingVideos = () => {
    navigation.navigate("HomePage", {});
  };

  return (
    <View style={styles.container}>
      <Text>{video.title}</Text>
      <View key={video.id}>
        <Video
          source={{ uri: video.link }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={isPlaying}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Play" onPress={handlePlayButtonPress} />
        <Button title="Pause" onPress={handlePauseButtonPress} />
      </View>
      <PrimaryButton onPress={goToStretchingVideos}>Back</PrimaryButton>
    </View>
  );
}

export default IndVideo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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

import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";

const VideoPlayer = ({ videoUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayButtonPress = () => {
    setIsPlaying(true);
  };

  const handlePauseButtonPress = () => {
    setIsPlaying(false);
  };

  // return (
  //   <View style={styles.videoContainer}>
  //     <Video
  //       style={styles.video}
  //       source={{ uri: videoUri }}
  //       useNativeControls
  //       resizeMode="contain"
  //       isLooping
  //       shouldPlay={isPlaying}
  //     />
  //     <View style={styles.buttonContainer}>
  //       <Button title="Play" onPress={handlePlayButtonPress} />
  //       <Button title="Pause" onPress={handlePauseButtonPress} />
  //     </View>
  //   </View>
  // );

  try {
    return (
      <View style={styles.videoContainer}>
        <Video
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={isPlaying}
        />
        <View style={styles.buttonContainer}>
          <Button title="Play" onPress={handlePlayButtonPress} />
          <Button title="Pause" onPress={handlePauseButtonPress} />
        </View>
      </View>
    );
  } catch (error) {
    console.error("Error loading video:", error);
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading video</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});

export default VideoPlayer;

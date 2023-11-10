import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function Timer({ startTime }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <Text style={styles.timerText}>Elapsed time: {elapsedTime} seconds</Text>
  );
}

export default Timer;

const styles = StyleSheet.create({
  timerText: {
    fontSize: 20,
  },
});

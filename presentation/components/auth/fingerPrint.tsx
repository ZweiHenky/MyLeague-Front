import { MaterialIcons } from "@expo/vector-icons"
import { useEffect, useCallback } from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"


export default function AnimatedFingerprint() {
  // Create multiple animated values for different rings
  const ring1 = new Animated.Value(0)
  const ring2 = new Animated.Value(0)
  const ring3 = new Animated.Value(0)

  const createPulseAnimation = useCallback((ring: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(ring, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(ring, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ])
  }, [])

  useEffect(() => {
    // Create infinite pulse animation
    Animated.loop(
      Animated.stagger(400, [createPulseAnimation(ring1), createPulseAnimation(ring2), createPulseAnimation(ring3)]),
    ).start()
  }, [createPulseAnimation, ring1, ring2, ring3])

  return (
    <View style={styles.container}>
      {/* Animated rings */}
      {[ring1, ring2, ring3].map((ring, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ring,
            {
              transform: [
                {
                  scale: ring.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2],
                  }),
                },
              ],
              opacity: ring.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 0],
              }),
            },
          ]}
        />
      ))}

      {/* Center button with fingerprint icon */}
      <View style={styles.button}>
        <MaterialIcons name="fingerprint" size={60} color={"#fff"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: "#0E7C7B",
    opacity: 0.8,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#0E7C7B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})


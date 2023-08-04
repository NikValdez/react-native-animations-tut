import { Text, View, Button } from "react-native"
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  cancelAnimation,
} from "react-native-reanimated"

export default function App() {
  const scaleValue = useSharedValue(0)
  const config = {
    duration: 2000,
    easing: Easing.inOut(Easing.ease),
  }

  const style = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [0, 1], [1, 0.2])
    return {
      transform: [{ scale }],
    }
  })

  const startAnimation = () => {
    scaleValue.value = withRepeat(withTiming(1, config), -1, true)
  }

  const stopAnimation = () => {
    cancelAnimation(scaleValue)
    scaleValue.value = 0
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated.View
        style={[
          {
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#155e75",
            margin: 30,
          },
          style,
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "center",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Breathe
        </Text>
      </Animated.View>
      <Button title="Start" onPress={startAnimation} />
      <Button title="Stop" onPress={stopAnimation} />
    </View>
  )
}

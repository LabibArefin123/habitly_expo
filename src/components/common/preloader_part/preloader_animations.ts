
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export function usePreloaderAnimations() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    void SplashScreen.hideAsync().catch(() => undefined);

    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),
    ]);

    const rotate = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const loadingProgress = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );

    entrance.start();
    rotate.start();
    loadingProgress.start();

    return () => {
      entrance.stop();
      rotate.stop();
      loadingProgress.stop();
    };
  }, [opacity, scale, rotation, progress]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["12%", "88%"],
  });

  return {
    opacity,
    scale,
    rotateInterpolation,
    progressWidth,
  };
}

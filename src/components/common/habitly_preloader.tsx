import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";

import { preloaderStyles as styles } from "../../styles/common/preloader.styles";

interface Props {
  message?: string;
}

export function HabitlyPreloader({
  message = "Preparing your habits...",
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/habitly-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.brandName}>Habitly</Text>

        <Text style={styles.tagline}>BUILD BETTER, EVERY DAY</Text>

        <View style={styles.loadingSection}>
          <View style={styles.loadingRow}>
            <Animated.View
              style={[
                styles.spinner,
                { transform: [{ rotate: rotateInterpolation }] },
              ]}
            />

            <Text style={styles.loadingText}>{message}</Text>
          </View>

          <View style={styles.progressTrack}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
        </View>
      </Animated.View>

      <Text style={styles.footer}>SMALL STEPS. BIG CHANGES.</Text>
    </View>
  );
}

import { Animated, Image, Text, View } from "react-native";

import { preloaderStyles as styles } from "../../../styles/common/preloader.styles";

interface PreloaderContentProps {
  message: string;
  opacity: Animated.Value;
  scale: Animated.Value;
  rotateInterpolation: Animated.AnimatedInterpolation<string>;
  progressWidth: Animated.AnimatedInterpolation<string | number>;
}

export function PreloaderContent({
  message,
  opacity,
  scale,
  rotateInterpolation,
  progressWidth,
}: PreloaderContentProps) {
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
            source={require("../../../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Habitly app icon"
          />
        </View>

        <Text style={styles.brandName}>Habitly</Text>
        <Text style={styles.tagline}>BUILD BETTER, EVERY DAY</Text>

        <View style={styles.loadingSection}>
          <View style={styles.loadingRow}>
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [{ rotate: rotateInterpolation }],
                },
              ]}
            />
            <Text style={styles.loadingText}>{message}</Text>
          </View>

          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityLabel="App loading"
          >
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

import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

type HomeHeaderProps = {
  onProfilePress: () => void;
};

export function HomeHeader({ onProfilePress }: HomeHeaderProps) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>WELCOME BACK 👋</Text>
          <Text style={styles.heading}>Habitly</Text>
          <Text style={styles.subtitle}>Build better habits every day.</Text>
        </View>

        <Pressable
          style={styles.avatar}
          onPress={onProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <Text style={styles.avatarText}>L</Text>
        </Pressable>
      </View>

      <Text style={styles.date}>{today}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heading: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
  },
  date: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 15,
  },
});

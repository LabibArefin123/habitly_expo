import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

export function HomeMotivation() {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.emoji}>✨</Text>

        <Text style={styles.title}>Consistency is everything.</Text>

        <Text style={styles.description}>
          Small actions repeated daily create remarkable results.
        </Text>
      </View>

      <Text style={styles.footer}>Made with ❤️ by Habitly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primaryLight,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  description: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
  footer: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 25,
    marginBottom: 25,
  },
});

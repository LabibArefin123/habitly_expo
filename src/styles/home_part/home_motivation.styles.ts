
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const homeMotivationStyles = StyleSheet.create({
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

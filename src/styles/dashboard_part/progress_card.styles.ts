
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const progressCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  label: {
    color: "#D8D5FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 22,
    marginBottom: 12,
  },
  percentage: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: "800",
  },
  description: {
    color: "#E2E0FF",
    fontSize: 12,
    marginLeft: 10,
  },
  track: {
    height: 9,
    backgroundColor: "#9690FF",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  footer: {
    color: "#E2E0FF",
    fontSize: 11,
    marginTop: 14,
  },
});


import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const analyticsHeaderStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  yearButton: {
    width: 27,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
  },
  year: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    minWidth: 42,
    textAlign: "center",
  },
  summary: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
  },
  summaryLabel: {
    color: "#E5E3FF",
    fontSize: 10,
    marginTop: 5,
  },
  divider: {
    width: 1,
    backgroundColor: "#FFFFFF40",
    marginHorizontal: 18,
  },
});

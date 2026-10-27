
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const settingsSummaryStyles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 19,
    marginBottom: 25,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryEyebrow: {
    color: "#D7F5E4",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  summaryTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5,
  },
  summaryIcon: {
    fontSize: 28,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    color: "#D7F5E4",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#FFFFFF40",
  },
});

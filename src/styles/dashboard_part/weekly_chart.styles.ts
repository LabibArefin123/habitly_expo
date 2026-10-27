
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const weeklyChartStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  averageBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  average: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "900",
  },
  averageLabel: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 2,
  },
  chart: {
    height: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  percentage: {
    color: COLORS.muted,
    fontSize: 9,
    marginBottom: 7,
  },
  track: {
    width: 23,
    height: 105,
    backgroundColor: "#F0F0F8",
    borderRadius: 12,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  day: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 10,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: 10,
    marginLeft: 7,
  },
});

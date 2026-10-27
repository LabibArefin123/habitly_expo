
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const yearlyOverviewStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
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
    fontSize: 15,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  year: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },
  summary: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 15,
  },
  chartTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 23,
    marginBottom: 15,
  },
  chart: {
    height: 155,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
  },
  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barValue: {
    color: COLORS.muted,
    fontSize: 8,
    height: 15,
    marginBottom: 5,
  },
  barTrack: {
    width: "65%",
    height: 105,
    backgroundColor: COLORS.background,
    borderRadius: 7,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    minHeight: 0,
  },
  monthLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "600",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 15,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 10,
  },
});

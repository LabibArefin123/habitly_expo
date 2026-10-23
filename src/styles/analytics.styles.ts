
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const analyticsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 22,
  },
  daySummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 12,
  },
  dayPercent: {
    fontSize: 29,
    fontWeight: "900",
    color: COLORS.primary,
  },
  daySummaryInfo: {
    flex: 1,
  },
  daySummaryTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },
  muted: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 3,
  },
  empty: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 18,
    paddingVertical: 8,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
  },
  habitIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  habitEmoji: {
    fontSize: 19,
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },
  status: {
    fontSize: 10,
    fontWeight: "800",
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: 22,
  },
  metric: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricSpacing: {
    marginRight: 8,
  },
  metricValue: {
    fontSize: 23,
    fontWeight: "900",
    color: COLORS.primary,
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: COLORS.muted,
    marginVertical: 12,
  },
});


import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const monthlyCalendarStyles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "space-between",
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
  navigation: {
    flexDirection: "row",
    gap: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: COLORS.text,
    fontSize: 23,
    lineHeight: 26,
  },
  monthTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 22,
    marginBottom: 16,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "600",
  },
  completedDay: {
    backgroundColor: COLORS.greenLight,
  },
  completedDayText: {
    color: COLORS.green,
    fontWeight: "800",
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  completionDot: {
    position: "absolute",
    bottom: 1,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.green,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 12,
    paddingTop: 13,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: 10,
  },
  completedCount: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "700",
  },
});

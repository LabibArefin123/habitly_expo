
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const habitFormReminderStyles = StyleSheet.create({
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  reminderContent: {
    flex: 1,
    paddingRight: 12,
  },
  reminderTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
  },
  reminderSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeInputWrapper: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});

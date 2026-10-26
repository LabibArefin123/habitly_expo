
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const habitCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    width: 46,
    height: 46,
    flexShrink: 0,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    flexShrink: 1,
  },
  done: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  description: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    flexShrink: 1,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  streakIcon: {
    fontSize: 11,
  },
  streakText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
  },
});

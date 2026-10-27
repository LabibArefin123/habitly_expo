
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const achievementListStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 17,
    marginBottom: 20,
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
  counter: {
    backgroundColor: COLORS.greenLight,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  counterText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "800",
  },
  list: {
    marginTop: 18,
    gap: 15,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lockedAchievement: {
    opacity: 0.65,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  unlockedIcon: {
    backgroundColor: COLORS.greenLight,
  },
  lockedIcon: {
    backgroundColor: COLORS.background,
  },
  icon: {
    fontSize: 21,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  achievementTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    flex: 1,
  },
  unlockedLabel: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: "900",
  },
  description: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressText: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },
});

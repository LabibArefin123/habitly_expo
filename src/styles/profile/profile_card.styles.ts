
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 25,
    alignItems: "center",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: "900",
  },
  name: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 17,
    textAlign: "center",
  },
  profession: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },
  bio: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 13,
  },
  memberBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 17,
  },
  memberBadgeText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
});

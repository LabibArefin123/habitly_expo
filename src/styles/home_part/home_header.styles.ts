
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const homeHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heading: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
  },
  date: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 15,
  },
});


import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  icon: {
    fontSize: 45,
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 9,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 18,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },
});

export const appStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    minHeight: 0,
  },
  bottomNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingBottom: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    gap: 3,
  },
  tabIcon: {
    color: COLORS.muted,
    fontSize: 23,
    fontWeight: "700",
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  activeTabText: {
    color: COLORS.primary,
  },
});

export const screenHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  title: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
});

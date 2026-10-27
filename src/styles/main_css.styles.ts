
import { StyleSheet } from "react-native";
import { COLORS } from "../../src/constants/theme";

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  },
  bottomNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 9,
    paddingBottom: 7,
    zIndex: 10,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    minHeight: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    gap: 4,
  },
  tabButtonPressed: {
    opacity: 0.65,
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  activeTabText: {
    color: COLORS.primary,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: 24,
    height: 3,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});

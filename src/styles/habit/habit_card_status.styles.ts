
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const habitCardStatusStyles = StyleSheet.create({
  check: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#DADDE8",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.55,
  },
  more: {
    flexShrink: 0,
    paddingLeft: 10,
    paddingVertical: 8,
  },
  moreText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});

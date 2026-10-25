
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 29,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: -3,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  spacer: {
    width: 42,
  },
});

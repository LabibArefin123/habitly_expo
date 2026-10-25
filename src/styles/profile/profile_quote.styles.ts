
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileQuoteStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 19,
    padding: 19,
    marginTop: 22,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 10,
  },
  description: {
    color: "#E5E3FF",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 6,
  },
});

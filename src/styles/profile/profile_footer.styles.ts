
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileFooterStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 25,
  },
});

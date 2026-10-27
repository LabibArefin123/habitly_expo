
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const statisticsCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 19,
  },
  title: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  value: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
});

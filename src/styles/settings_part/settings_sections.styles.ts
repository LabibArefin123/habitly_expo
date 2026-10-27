
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const settingsSectionsStyles = StyleSheet.create({
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 11,
  },
  dangerTitle: {
    color: COLORS.orange,
    fontSize: 11,
    fontWeight: "800",
  },
  chevron: {
    color: COLORS.muted,
    fontSize: 25,
    fontWeight: "400",
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 11,
  },
  brandIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  brandEmoji: {
    fontSize: 21,
  },
  aboutTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },
  version: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 7,
  },
});

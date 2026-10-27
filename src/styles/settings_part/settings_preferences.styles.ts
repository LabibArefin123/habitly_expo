
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const settingsPreferencesStyles = StyleSheet.create({
  section: {
    marginBottom: 22,
  },
  sectionHeading: {
    marginBottom: 11,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 11,
  },
  optionIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  optionEmoji: {
    fontSize: 17,
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },
  optionDescription: {
    color: COLORS.muted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },
});

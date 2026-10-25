
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileAboutStyles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 13,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  label: {
    color: COLORS.muted,
    fontSize: 10,
  },
  value: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },
});

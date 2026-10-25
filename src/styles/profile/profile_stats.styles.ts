
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const profileStatsStyles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 13,
  },
  grid: {
    flexDirection: "row",
    gap: 9,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  icon: {
    fontSize: 21,
  },
  value: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 9,
  },
  label: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  loading: {
    padding: 25,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 17,
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 9,
  },
});

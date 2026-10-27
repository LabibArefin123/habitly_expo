
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const settingsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 35,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    gap: 12,
  },

  loadingText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "600",
  },

  header: {
    marginBottom: 22,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 19,
    marginBottom: 25,
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summaryEyebrow: {
    color: "#D7F5E4",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  summaryTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5,
  },

  summaryIcon: {
    fontSize: 28,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },

  statLabel: {
    color: "#D7F5E4",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 5,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#FFFFFF40",
  },

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

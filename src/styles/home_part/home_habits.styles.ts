
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const homeHabitsStyles = StyleSheet.create({
  habitsContainer: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headingContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 15,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 9,
    lineHeight: 19,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 12,
  },
});


import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
    flexGrow: 1,
  },
  floatingAddButton: {
    position: "absolute",
    right: 20,
    bottom: 18,
    height: 54,
    paddingHorizontal: 21,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    zIndex: 10,
  },
  floatingAddIcon: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "500",
    lineHeight: 29,
  },
  floatingAddText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  // Habit section
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

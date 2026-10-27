
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const weeklyDayModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.58)",
  },
  modal: {
    width: "100%",
    maxWidth: 440,
    maxHeight: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  title: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 5,
  },
  date: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 29,
  },
  loading: {
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  list: {
    flexGrow: 0,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 6,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  summaryNumber: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },
  sectionCount: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "800",
    overflow: "hidden",
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  habitIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  habitEmoji: {
    fontSize: 18,
  },
  habitTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },
  completedHabitTitle: {
    color: COLORS.muted,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  completedBadge: {
    backgroundColor: COLORS.greenLight,
  },
  incompleteBadge: {
    backgroundColor: "#FFF1E8",
  },
  statusText: {
    fontSize: 9,
    fontWeight: "800",
  },
  completedStatusText: {
    color: COLORS.green,
  },
  incompleteStatusText: {
    color: "#C76A2A",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
    paddingVertical: 10,
  },
});

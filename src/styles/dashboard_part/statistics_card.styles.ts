
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    backgroundColor: "rgba(20, 18, 35, 0.58)",
  },
  modalBackdrop: {
   ...StyleSheet.absoluteFill,
  },
  modalContent: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "82%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
  },
  modalScrollContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalIconBox: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  modalIcon: {
    fontSize: 27,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 27,
    lineHeight: 30,
    color: COLORS.text,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },
  modalValue: {
    fontSize: 42,
    fontWeight: "900",
    marginTop: 12,
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 5,
    lineHeight: 20,
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },
  detailsHeading: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 9,
  },
  modalDescription: {
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.muted,
  },
  tipBox: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.muted,
  },
  doneButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  doneButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});

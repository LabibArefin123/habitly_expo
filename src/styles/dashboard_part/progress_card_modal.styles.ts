
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const progressCardModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    backgroundColor: "rgba(20, 18, 35, 0.58)",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  modal: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "82%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  icon: {
    fontSize: 34,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 27,
    lineHeight: 30,
    color: COLORS.text,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: COLORS.primary,
  },
  title: {
    marginTop: 7,
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },
  percentage: {
    marginTop: 20,
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.primary,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: COLORS.muted,
  },
  track: {
    height: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  statValue: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.text,
  },
  statLabel: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.muted,
  },
  messageBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 15,
    backgroundColor: COLORS.background,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },
  message: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.muted,
  },
  doneButton: {
    minHeight: 48,
    marginTop: 22,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  doneText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },
});

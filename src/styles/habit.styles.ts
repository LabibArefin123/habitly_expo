
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const habitCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    width: 46,
    height: 46,
    flexShrink: 0,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    flexShrink: 1,
  },
  done: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  description: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    flexShrink: 1,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  streakIcon: {
    fontSize: 11,
  },
  streakText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
  },
  check: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#DADDE8",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.55,
  },
  more: {
    flexShrink: 0,
    paddingLeft: 10,
    paddingVertical: 8,
  },
  moreText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});

export const habitFormStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    color: COLORS.muted,
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: COLORS.text,
    fontSize: 13,
  },
  descriptionInput: {
    height: 85,
    textAlignVertical: "top",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategory: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  selectedCategoryText: {
    color: COLORS.primary,
  },
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIcon: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  iconText: {
    fontSize: 22,
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  reminderContent: {
    flex: 1,
    paddingRight: 12,
  },
  reminderTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
  },
  reminderSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeInputWrapper: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.5,
  },
});

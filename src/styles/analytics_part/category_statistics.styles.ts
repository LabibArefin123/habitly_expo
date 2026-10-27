
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const categoryStatisticsStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
  count: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },
  list: {
    marginTop: 20,
    gap: 19,
  },
  categoryItem: {
    gap: 9,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryNameGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  categoryDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  categoryName: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },
  percentage: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },
  progressTrack: {
    height: 7,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    color: COLORS.muted,
    fontSize: 10,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },
});

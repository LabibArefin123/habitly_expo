import { StyleSheet } from "react-native";

export const preloaderLoadingStyles = StyleSheet.create({
  loadingSection: {
    width: "75%",
    marginTop: 48,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 9,
  },
  spinner: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#C6E9D5",
    borderTopColor: "#16A36A",
    borderRadius: 7,
  },
  loadingText: {
    color: "#62816F",
    fontSize: 11,
    fontWeight: "600",
  },
  progressTrack: {
    width: "100%",
    height: 4,
    borderRadius: 10,
    backgroundColor: "#DCEBE1",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#16A36A",
  },
});
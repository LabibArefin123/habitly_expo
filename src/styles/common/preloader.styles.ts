
import { StyleSheet } from "react-native";

export const preloaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },

  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    width: 112,
    height: 112,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    shadowColor: "#087A50",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 5,
  },

  logo: {
    width: 88,
    height: 88,
  },

  brandName: {
    color: "#153D2D",
    fontSize: 31,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  tagline: {
    color: "#6D8C7A",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 8,
  },

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

  footer: {
    position: "absolute",
    bottom: 35,
    color: "#9BB5A5",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },
});

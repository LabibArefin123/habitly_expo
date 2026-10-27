import { StyleSheet } from "react-native";

export const preloaderBrandStyles = StyleSheet.create({
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
});
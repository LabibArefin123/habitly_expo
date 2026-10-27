import { StyleSheet } from "react-native";

export const preloaderLayoutStyles = StyleSheet.create({
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
  footer: {
    position: "absolute",
    bottom: 35,
    color: "#9BB5A5",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },
});
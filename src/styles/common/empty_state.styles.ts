
import { StyleSheet } from "react-native";

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 36,
  },

  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F6EE",
    marginBottom: 20,
  },

  icon: {
    fontSize: 34,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#173D2C",
    textAlign: "center",
    marginBottom: 9,
  },

  description: {
    maxWidth: 280,
    fontSize: 13,
    lineHeight: 21,
    color: "#82948A",
    textAlign: "center",
  },

  button: {
    marginTop: 22,
    minHeight: 46,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: "#16A36A",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});


import { StyleSheet } from "react-native";

export const screenHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  eyebrow: {
    color: "#16A36A",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },

  title: {
    color: "#173D2C",
    fontSize: 23,
    fontWeight: "800",
  },

  subtitle: {
    color: "#82948A",
    fontSize: 12,
    lineHeight: 18,
  },

  actionButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F6EE",
  },

  actionButtonPressed: {
    opacity: 0.65,
  },

  actionIcon: {
    color: "#16A36A",
  },
});

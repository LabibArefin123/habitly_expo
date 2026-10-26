
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const habitFormInputStyles = StyleSheet.create({
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
});

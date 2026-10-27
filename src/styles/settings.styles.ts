
import { StyleSheet } from "react-native";

import { settingsLayoutStyles } from "./settings_part/settings_layout.styles";
import { settingsSummaryStyles } from "./settings_part/settings_summary.styles";
import { settingsPreferencesStyles } from "./settings_part/settings_preferences.styles";
import { settingsSectionsStyles } from "./settings_part/settings_sections.styles";

export const settingsStyles = StyleSheet.create({
  ...settingsLayoutStyles,
  ...settingsSummaryStyles,
  ...settingsPreferencesStyles,
  ...settingsSectionsStyles,
});

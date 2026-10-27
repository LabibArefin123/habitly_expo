import { Switch, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { settingsStyles as styles } from "../../styles/settings.styles";

interface SettingsSwitchProps {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}

export function SettingsSwitch({
  icon,
  title,
  description,
  value,
  disabled,
  onChange,
}: SettingsSwitchProps) {
  return (
    <View style={styles.switchRow}>
      <View style={styles.optionIcon}>
        <Text style={styles.optionEmoji}>{icon}</Text>
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{
          false: COLORS.border,
          true: COLORS.primary,
        }}
        thumbColor={COLORS.white}
      />
    </View>
  );
}

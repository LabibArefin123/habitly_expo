import { Suspense, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SQLiteProvider } from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/home_screen";
import { AnalyticsScreen } from "./src/screens/analytics_screen";
import { SettingsScreen } from "./src/screens/settings_screen";
import { HabitlyPreloader } from "./src/components/common/habitly_preloader";
import { initializeDatabase } from "./src/database/database";
import { styles } from "./src/styles/main_css.styles";

void SplashScreen.preventAutoHideAsync().catch(() => undefined);

type TabName = "home" | "analytics" | "settings";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Suspense fallback={<HabitlyPreloader />}>
        <SQLiteProvider
          databaseName="habitly.db"
          onInit={initializeDatabase}
          useSuspense
        >
          <MainApp />
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  return (
    <SafeAreaView
      style={styles.appContainer}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.screen}>
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "analytics" && <AnalyticsScreen />}
        {activeTab === "settings" && <SettingsScreen />}
      </View>

      <View style={styles.bottomNavigation}>
        <TabButton
          label="Home"
          icon="home-outline"
          activeIcon="home"
          active={activeTab === "home"}
          onPress={() => setActiveTab("home")}
        />
        <TabButton
          label="Analytics"
          icon="stats-chart-outline"
          activeIcon="stats-chart"
          active={activeTab === "analytics"}
          onPress={() => setActiveTab("analytics")}
        />
        <TabButton
          label="Settings"
          icon="settings-outline"
          activeIcon="settings"
          active={activeTab === "settings"}
          onPress={() => setActiveTab("settings")}
        />
      </View>
    </SafeAreaView>
  );
}

interface TabButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}

function TabButton({
  label,
  icon,
  activeIcon,
  active,
  onPress,
}: TabButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
      ]}
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${label}`}
      accessibilityState={{ selected: active }}
    >
      <Ionicons
        name={active ? activeIcon : icon}
        size={21}
        color={active ? "#6C63FF" : "#94A3B8"}
      />
      <Text style={[styles.tabLabel, active && styles.activeTabText]}>
        {label}
      </Text>
      {active && <View style={styles.activeIndicator} />}
    </Pressable>
  );
}

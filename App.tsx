import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/home_screen";
import { AnalyticsScreen } from "./src/screens/analytics_screen";
import { initializeDatabase } from "./src/database/database";
import { COLORS } from "./src/constants/theme";

import { appStyles as styles } from "./src/styles/common.styles";

type TabName = "home" | "analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="habitly.db" onInit={initializeDatabase}>
        <SafeAreaView
          style={styles.appContainer}
          edges={["top", "left", "right", "bottom"]}
        >
          <StatusBar style="dark" />

          <View style={styles.screen}>
            {activeTab === "home" ? <HomeScreen /> : <AnalyticsScreen />}
          </View>

          <View style={styles.bottomNavigation}>
            <TabButton
              label="Home"
              icon="⌂"
              active={activeTab === "home"}
              onPress={() => setActiveTab("home")}
            />

            <TabButton
              label="Analytics"
              icon="▥"
              active={activeTab === "analytics"}
              onPress={() => setActiveTab("analytics")}
            />
          </View>
        </SafeAreaView>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

interface TabButtonProps {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

function TabButton({ label, icon, active, onPress }: TabButtonProps) {
  return (
    <Pressable
      style={styles.tabButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabIcon, active && styles.activeTabText]}>
        {icon}
      </Text>

      <Text style={[styles.tabLabel, active && styles.activeTabText]}>
        {label}
      </Text>
    </Pressable>
  );
}

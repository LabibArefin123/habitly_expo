import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { HomeScreen } from "../habitly/src/screens/home_screen";
import { initializeDatabase } from "../habitly/src/database/database";

export default function App() {
  return (
    <SQLiteProvider databaseName="habitly.db" onInit={initializeDatabase}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <HomeScreen />
      </SafeAreaView>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
});

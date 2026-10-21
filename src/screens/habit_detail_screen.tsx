import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { getHabitAnalytics } from "../database/advanced_analytics_queries";
import type { HabitAnalytics } from "../types/analytics.types";
import { COLORS } from "../constants/theme";

interface Props {
  habitId: number;
  title: string;
  onBack: () => void;
}

export function HabitDetailScreen({ habitId, title, onBack }: Props) {
  const db = useSQLiteContext();
  const [data, setData] = useState<HabitAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getHabitAnalytics(db, habitId)
      .then((result) => { if (active) setData(result); })
      .catch(console.error)
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [db, habitId]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>;
  }
  if (!data) {
    return <View style={styles.center}><Text style={styles.title}>Habit not found</Text><Pressable onPress={onBack}><Text style={styles.backText}>Go back</Text></Pressable></View>;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backText}>‹  Analytics</Text></Pressable>
      <View style={styles.hero}>
        <View style={[styles.iconBox,{backgroundColor:`${data.color}22`}]}><Text style={{fontSize:31}}>{data.icon}</Text></View>
        <Text style={styles.title}>{data.title || title}</Text>
        <Text style={styles.category}>{data.category}</Text>
        {!!data.description && <Text style={styles.description}>{data.description}</Text>}
      </View>

      <View style={styles.rateCard}>
        <Text style={styles.eyebrow}>OVERALL COMPLETION RATE</Text>
        <Text style={styles.rate}>{data.completionRate}%</Text>
        <View style={styles.track}><View style={[styles.fill,{width:`${data.completionRate}%`}]} /></View>
        <Text style={styles.small}>{data.totalCompletions} completions since {data.created_at.slice(0,10)}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.metric}><Text style={styles.metricIcon}>🔥</Text><Text style={styles.metricValue}>{data.currentStreak}</Text><Text style={styles.metricLabel}>Current streak</Text></View>
        <View style={styles.metric}><Text style={styles.metricIcon}>🏆</Text><Text style={styles.metricValue}>{data.longestStreak}</Text><Text style={styles.metricLabel}>Best streak</Text></View>
        <View style={styles.metric}><Text style={styles.metricIcon}>📅</Text><Text style={styles.metricValue}>{data.monthlyCompletions}</Text><Text style={styles.metricLabel}>This month</Text></View>
        <View style={styles.metric}><Text style={styles.metricIcon}>✅</Text><Text style={styles.metricValue}>{data.totalCompletions}</Text><Text style={styles.metricLabel}>All completions</Text></View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Habit activity</Text>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Created</Text><Text style={styles.infoValue}>{data.created_at.slice(0,10)}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Last completed</Text><Text style={styles.infoValue}>{data.lastCompleted ?? "Not completed yet"}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Tracked days</Text><Text style={styles.infoValue}>{data.activeDays}</Text></View>
      </View>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},
  content:{padding:20,paddingBottom:35},
  center:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:COLORS.background,gap:12},
  backButton:{marginBottom:20},
  backText:{fontSize:13,fontWeight:"800",color:COLORS.primary},
  hero:{alignItems:"center",marginBottom:22},
  iconBox:{width:72,height:72,borderRadius:23,alignItems:"center",justifyContent:"center",marginBottom:13},
  title:{fontSize:23,fontWeight:"900",color:COLORS.text},
  category:{fontSize:11,color:COLORS.primary,fontWeight:"800",marginTop:5},
  description:{fontSize:11,color:COLORS.muted,marginTop:8,textAlign:"center"},
  rateCard:{backgroundColor:COLORS.primary,borderRadius:22,padding:21,marginBottom:15},
  eyebrow:{fontSize:9,color:"#E3E1FF",fontWeight:"800",letterSpacing:1.2},
  rate:{fontSize:42,color:COLORS.white,fontWeight:"900",marginTop:8},
  track:{height:8,backgroundColor:"#9992FF",borderRadius:8,overflow:"hidden",marginTop:10},
  fill:{height:"100%",backgroundColor:COLORS.white,borderRadius:8},
  small:{fontSize:10,color:"#E3E1FF",marginTop:12},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginBottom:15},
  metric:{width:"48%",flexGrow:1,backgroundColor:COLORS.white,borderRadius:17,padding:15,borderWidth:1,borderColor:COLORS.border},
  metricIcon:{fontSize:18},
  metricValue:{fontSize:23,fontWeight:"900",color:COLORS.text,marginTop:7},
  metricLabel:{fontSize:10,color:COLORS.muted,marginTop:3},
  infoCard:{backgroundColor:COLORS.white,borderRadius:18,padding:17,borderWidth:1,borderColor:COLORS.border},
  infoTitle:{fontSize:14,fontWeight:"900",color:COLORS.text,marginBottom:10},
  infoRow:{flexDirection:"row",justifyContent:"space-between",paddingVertical:11,borderTopWidth:1,borderTopColor:COLORS.border},
  infoLabel:{fontSize:11,color:COLORS.muted},
  infoValue:{fontSize:11,fontWeight:"800",color:COLORS.text},
});

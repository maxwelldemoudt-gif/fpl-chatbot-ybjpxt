
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "@/contexts/ThemeContext";

export default function ProfileScreen() {
  const theme = useTheme();
  const { colors, themeMode, setThemeMode, isDark } = useAppTheme();

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    console.log('Changing theme to:', mode);
    setThemeMode(mode);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <GlassView style={[
          styles.profileHeader,
          Platform.OS !== 'ios' && { backgroundColor: colors.card }
        ]} glassEffectStyle="regular">
          <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          <Text style={[styles.name, { color: colors.text }]}>FPL Manager</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>Ready to dominate your league!</Text>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: colors.card }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'light' && { backgroundColor: colors.primary }
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <IconSymbol 
                name="sun.max.fill" 
                size={20} 
                color={themeMode === 'light' ? '#FFFFFF' : colors.textSecondary} 
              />
              <Text style={[
                styles.themeOptionText,
                { color: themeMode === 'light' ? '#FFFFFF' : colors.text }
              ]}>
                Light
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'dark' && { backgroundColor: colors.primary }
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <IconSymbol 
                name="moon.fill" 
                size={20} 
                color={themeMode === 'dark' ? '#FFFFFF' : colors.textSecondary} 
              />
              <Text style={[
                styles.themeOptionText,
                { color: themeMode === 'dark' ? '#FFFFFF' : colors.text }
              ]}>
                Dark
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'system' && { backgroundColor: colors.primary }
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <IconSymbol 
                name="gear" 
                size={20} 
                color={themeMode === 'system' ? '#FFFFFF' : colors.textSecondary} 
              />
              <Text style={[
                styles.themeOptionText,
                { color: themeMode === 'system' ? '#FFFFFF' : colors.text }
              ]}>
                System
              </Text>
            </TouchableOpacity>
          </View>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: colors.card }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: colors.text }]}>FPL Stats</Text>
          
          <View style={styles.statRow}>
            <IconSymbol name="trophy.fill" size={20} color={colors.secondary} />
            <Text style={[styles.statLabel, { color: colors.text }]}>Overall Rank</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>125,432</Text>
          </View>
          
          <View style={styles.statRow}>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color={colors.accent} />
            <Text style={[styles.statLabel, { color: colors.text }]}>Total Points</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>1,847</Text>
          </View>
          
          <View style={styles.statRow}>
            <IconSymbol name="banknote" size={20} color={colors.highlight} />
            <Text style={[styles.statLabel, { color: colors.text }]}>Team Value</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>£102.3m</Text>
          </View>
        </GlassView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  statLabel: {
    flex: 1,
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});


import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useFPLChatbot } from "@/hooks/useFPLChatbot";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { IconSymbol } from "@/components/IconSymbol";
import { ScrollView, Switch } from 'react-native';
import { GlassView } from "expo-glass-effect";

export default function HomeScreen() {
  const { colors, themeMode, setThemeMode, isDark } = useAppTheme();
  const { messages, isTyping, sendMessage, clearChat } = useFPLChatbot();
  const [activeView, setActiveView] = useState<'chat' | 'settings'>('chat');

  const renderMessage = ({ item }: { item: ChatMessageType }) => (
    <ChatMessage message={item} />
  );

  const renderFooter = () => {
    if (!isTyping) return null;
    return <TypingIndicator />;
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    console.log('Changing theme to:', mode);
    setThemeMode(mode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Custom Header with Chat/Settings Switcher */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {activeView === 'chat' ? 'FPL Assistant' : 'Settings'}
        </Text>
        
        <View style={styles.switcherContainer}>
          <TouchableOpacity
            style={[
              styles.switcherButton,
              activeView === 'chat' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveView('chat')}
            activeOpacity={0.7}
          >
            <IconSymbol 
              name="message.fill" 
              size={18} 
              color={activeView === 'chat' ? '#FFFFFF' : colors.textSecondary} 
            />
            <Text style={[
              styles.switcherText,
              { color: activeView === 'chat' ? '#FFFFFF' : colors.textSecondary }
            ]}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.switcherButton,
              activeView === 'settings' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveView('settings')}
            activeOpacity={0.7}
          >
            <IconSymbol 
              name="gear" 
              size={18} 
              color={activeView === 'settings' ? '#FFFFFF' : colors.textSecondary} 
            />
            <Text style={[
              styles.switcherText,
              { color: activeView === 'settings' ? '#FFFFFF' : colors.textSecondary }
            ]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat View */}
      {activeView === 'chat' && (
        <>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps="handled"
          />
          
          <ChatInput 
            onSendMessage={sendMessage}
            disabled={isTyping}
          />
        </>
      )}

      {/* Settings View */}
      {activeView === 'settings' && (
        <ScrollView
          style={styles.settingsContainer}
          contentContainerStyle={styles.settingsContent}
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

          <TouchableOpacity
            style={[styles.clearChatButton, { backgroundColor: colors.primary }]}
            onPress={clearChat}
            activeOpacity={0.7}
          >
            <IconSymbol name="trash.fill" size={20} color="#FFFFFF" />
            <Text style={styles.clearChatText}>Clear Chat History</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  switcherContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  switcherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  switcherText: {
    fontSize: 14,
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  settingsContainer: {
    flex: 1,
  },
  settingsContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 120,
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
  clearChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  clearChatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

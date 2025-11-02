
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useFPLChatbot } from "@/hooks/useFPLChatbot";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { IconSymbol } from "@/components/IconSymbol";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { messages, isTyping, sendMessage } = useFPLChatbot();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');

  const renderMessage = ({ item }: { item: ChatMessageType }) => (
    <ChatMessage message={item} />
  );

  const renderFooter = () => {
    if (!isTyping) return null;
    return <TypingIndicator />;
  };

  const handleTabPress = (tab: 'chat' | 'profile') => {
    console.log('Tab pressed:', tab);
    setActiveTab(tab);
    if (tab === 'profile') {
      router.push('/profile');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Custom Header with Tab Selector */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>FPL Assistant</Text>
        
        <View style={[styles.tabSelector, { backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'chat' && { backgroundColor: colors.primary }
            ]}
            onPress={() => handleTabPress('chat')}
            activeOpacity={0.7}
          >
            <IconSymbol 
              name="message.fill" 
              size={18} 
              color={activeTab === 'chat' ? '#FFFFFF' : colors.text} 
            />
            <Text style={[
              styles.tabButtonText,
              { color: activeTab === 'chat' ? '#FFFFFF' : colors.text }
            ]}>
              Chat
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'profile' && { backgroundColor: colors.primary }
            ]}
            onPress={() => handleTabPress('profile')}
            activeOpacity={0.7}
          >
            <IconSymbol 
              name="person.fill" 
              size={18} 
              color={activeTab === 'profile' ? '#FFFFFF' : colors.text} 
            />
            <Text style={[
              styles.tabButtonText,
              { color: activeTab === 'profile' ? '#FFFFFF' : colors.text }
            ]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
  tabSelector: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 2,
    gap: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  tabButtonText: {
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
});

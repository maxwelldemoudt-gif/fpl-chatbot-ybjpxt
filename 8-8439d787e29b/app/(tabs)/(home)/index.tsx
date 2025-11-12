
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
import ProfileScreen from "../profile";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { messages, isTyping, sendMessage } = useFPLChatbot();
  const [activeView, setActiveView] = useState<'chat' | 'profile'>('chat');

  const renderMessage = ({ item }: { item: ChatMessageType }) => (
    <ChatMessage message={item} />
  );

  const renderFooter = () => {
    if (!isTyping) return null;
    return <TypingIndicator />;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Top Right Switcher */}
      <View style={styles.switcherContainer}>
        <View style={[styles.switcher, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
              color={activeView === 'chat' ? '#fff' : colors.text}
            />
            <Text style={[
              styles.switcherText,
              { color: activeView === 'chat' ? '#fff' : colors.text }
            ]}>
              Chat
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.switcherButton,
              activeView === 'profile' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setActiveView('profile')}
            activeOpacity={0.7}
          >
            <IconSymbol
              name="person.fill"
              size={18}
              color={activeView === 'profile' ? '#fff' : colors.text}
            />
            <Text style={[
              styles.switcherText,
              { color: activeView === 'profile' ? '#fff' : colors.text }
            ]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {activeView === 'chat' ? (
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
      ) : (
        <ProfileScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switcherContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  switcher: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  switcherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  switcherText: {
    fontSize: 14,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
});

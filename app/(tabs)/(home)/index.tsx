
import React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useFPLChatbot } from "@/hooks/useFPLChatbot";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { messages, isTyping, sendMessage } = useFPLChatbot();

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
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
});

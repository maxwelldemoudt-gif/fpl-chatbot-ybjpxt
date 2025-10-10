
import React from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useFPLChatbot } from "@/hooks/useFPLChatbot";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatMessage as ChatMessageType } from "@/types/chat";

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
    <>
      <Stack.Screen
        options={{
          title: "FPL Assistant",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messagesList,
            Platform.OS !== 'ios' && styles.messagesListWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          inverted={false}
          onContentSizeChange={() => {
            // Auto-scroll to bottom when new messages arrive
          }}
        />
        <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  messagesListWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
});

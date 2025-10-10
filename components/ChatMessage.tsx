
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { useAppTheme } from '@/contexts/ThemeContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[
      styles.container,
      message.isUser ? styles.userContainer : styles.botContainer
    ]}>
      <View style={[
        styles.bubble,
        message.isUser 
          ? [styles.userBubble, { backgroundColor: colors.primary }]
          : [styles.botBubble, { backgroundColor: colors.card, borderColor: colors.border }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: message.isUser ? '#FFFFFF' : colors.text }
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          { color: message.isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary }
        ]}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

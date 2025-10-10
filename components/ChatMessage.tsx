
import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { useAppTheme } from '@/contexts/ThemeContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { colors } = useAppTheme();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      message.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.bubble,
        {
          backgroundColor: message.isUser ? colors.primary : colors.card,
          borderColor: colors.border,
        }
      ]}>
        {message.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: message.image.uri }}
              style={[
                styles.messageImage,
                { borderColor: colors.border }
              ]}
              resizeMode="cover"
            />
            {message.imageAnalysis?.isAnalyzing && (
              <View style={[styles.analysisOverlay, { backgroundColor: colors.background + '90' }]}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={[styles.analysisText, { color: colors.text }]}>
                  Analyzing team...
                </Text>
              </View>
            )}
          </View>
        )}
        
        <Text style={[
          styles.messageText,
          { color: message.isUser ? '#FFFFFF' : colors.text }
        ]}>
          {message.text}
        </Text>
        
        <Text style={[
          styles.timestamp,
          { color: message.isUser ? '#FFFFFF80' : colors.textSecondary }
        ]}>
          {formatTime(message.timestamp)}
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
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  messageImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  analysisText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
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

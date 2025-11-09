
import { NativeTabs, Icon } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useAppTheme();

  // On iOS, use native tabs
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Icon name="message.fill" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person.fill" color={color} size={size} />
            ),
          }}
        />
      </NativeTabs>
    );
  }

  // On Android and Web, use Stack without bottom tabs
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}

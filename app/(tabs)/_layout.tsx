
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useAppTheme();

  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      title: 'Chat',
      icon: 'message.fill',
      route: '/(home)',
    },
    {
      name: 'profile',
      title: 'Profile',
      icon: 'person.fill',
      route: '/profile',
    },
  ];

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

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}


import { useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '@/contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import { IconSymbol } from '@/components/IconSymbol';

export interface TabBarItem {
  name: string;
  title: string;
  icon: string;
  route: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 34,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { colors } = useAppTheme();
  const activeIndex = useSharedValue(0);

  // Update active index based on current route
  React.useEffect(() => {
    const currentIndex = tabs.findIndex(tab => {
      if (tab.route === '/(home)') {
        return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
      }
      return pathname.includes(tab.name);
    });
    if (currentIndex !== -1) {
      activeIndex.value = withSpring(currentIndex);
    }
  }, [pathname, tabs]);

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    const indicatorWidth = 60; // Fixed width for the indicator
    const indicatorOffset = (tabWidth - indicatorWidth) / 2; // Center the indicator within each tab
    
    const translateX = interpolate(
      activeIndex.value,
      [0, tabs.length - 1],
      [indicatorOffset, (tabWidth * (tabs.length - 1)) + indicatorOffset]
    );

    return {
      transform: [{ translateX }],
      width: indicatorWidth,
    };
  });

  return (
    <SafeAreaView style={[styles.safeArea, { bottom: bottomMargin }]} edges={['bottom']}>
      <View style={[styles.container, { width: containerWidth }]}>
        <BlurView
          style={[
            styles.tabBar,
            {
              borderRadius,
              backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card,
              borderColor: colors.border,
            }
          ]}
          intensity={80}
          tint={theme.dark ? 'dark' : 'light'}
        >
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius - 4,
              },
              animatedStyle,
            ]}
          />
          
          {tabs.map((tab, index) => {
            const isActive = pathname === '/' ? tab.route === '/(home)' : pathname.includes(tab.name);
            
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? '#FFFFFF' : colors.text}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? '#FFFFFF' : colors.text,
                      opacity: isActive ? 1 : 0.7,
                    },
                  ]}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  activeIndicator: {
    position: 'absolute',
    height: 52,
    margin: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});

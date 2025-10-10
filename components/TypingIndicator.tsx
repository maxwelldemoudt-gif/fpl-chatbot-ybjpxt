
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { useAppTheme } from '@/contexts/ThemeContext';

export const TypingIndicator: React.FC = () => {
  const { colors } = useAppTheme();
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);

  useEffect(() => {
    const animate = () => {
      opacity1.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 600 })
        ),
        -1
      );
      
      setTimeout(() => {
        opacity2.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 600 }),
            withTiming(0.3, { duration: 600 })
          ),
          -1
        );
      }, 200);
      
      setTimeout(() => {
        opacity3.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 600 }),
            withTiming(0.3, { duration: 600 })
          ),
          -1
        );
      }, 400);
    };

    animate();
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: opacity3.value,
  }));

  return (
    <View style={[styles.container]}>
      <View style={[
        styles.bubble,
        { backgroundColor: colors.card, borderColor: colors.border }
      ]}>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, animatedStyle1]} />
          <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, animatedStyle2]} />
          <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, animatedStyle3]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

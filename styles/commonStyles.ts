
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const lightColors = {
  background: '#F5F5F5',
  backgroundAlt: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#03A9F4',
  secondary: '#FFC107',
  accent: '#7C4DFF',
  card: '#FFFFFF',
  highlight: '#64B5F6',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkColors = {
  background: '#121212',
  backgroundAlt: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#03A9F4',
  secondary: '#FFC107',
  accent: '#7C4DFF',
  card: '#1E1E1E',
  highlight: '#64B5F6',
  border: '#333333',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const getColors = (isDark: boolean) => isDark ? darkColors : lightColors;

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: lightColors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: lightColors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: lightColors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: lightColors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: lightColors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: lightColors.backgroundAlt,
    borderColor: lightColors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 2px 3px ${lightColors.shadow}`,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: "white",
  },
});

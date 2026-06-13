import useShoppingStore from '@/store/useShoppingStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SystemBars } from 'react-native-edge-to-edge';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const theme = useShoppingStore((state) => state.theme);
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? 'rgb(12, 12, 12)' : 'rgb(242, 242, 242)';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>

        {/* Hides the duplicate default native headers */}
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: backgroundColor,
          }
        }} />

        {/* Dynamic status bar: 'light' text on dark mode, 'dark' text on light mode */}
        <StatusBar
          style={isDark ? 'light' : 'dark'}
          backgroundColor={backgroundColor}
        />
        <SystemBars
          style={isDark ? 'light' : 'dark'}
          hidden={{
            statusBar: false,
            navigationBar: true,
          }}
        />

      </ThemeProvider>
    </SafeAreaProvider>
  );
}

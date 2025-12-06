import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Custom dark theme matching ForgeFit design
  const ForgeFitDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#0a0a0a',
      card: '#151515',
      primary: '#f97316',
      border: 'rgba(255,255,255,0.05)',
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? ForgeFitDarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header globally for all screens
          contentStyle: { backgroundColor: '#0a0a0a' },
          animation: 'slide_from_right',
        }}
      >
        {/* Main tab navigator - header hidden */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        
        {/* Index/Landing screen */}
        {/* <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        /> */}
        
        {/* Modal screen */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            headerShown: true,
            headerStyle: { backgroundColor: '#151515' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '600' },
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
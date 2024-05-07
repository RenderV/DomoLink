import { Stack } from 'expo-router/stack';
import useTheme from '../utils/useStyle';

export default function AppLayout() {
  const color = useTheme()
  return (
    <Stack
      screenOptions={{
        statusBarStyle: 'light',
        statusBarColor: color.background as string,
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
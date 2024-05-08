import { Stack } from 'expo-router/stack';
import useTheme from '../utils/useStyle';
import { ChatProvider } from '../components/chat/chatContext';

export default function AppLayout() {
  const color = useTheme()
  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          statusBarStyle: 'light',
          statusBarColor: color.background as string,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
import { Stack } from 'expo-router/stack';
import useColor, { StyleProvider } from '../utils/useStyle';
import { ChatProvider } from '../components/chat/chatContext';

export default function AppLayout() {
  const color = useColor()
  return (
    <ChatProvider>
      <StyleProvider>
        <Stack
          screenOptions={{
            statusBarStyle: 'light',
            statusBarColor: color.background as string,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </StyleProvider>
    </ChatProvider>
  );
}
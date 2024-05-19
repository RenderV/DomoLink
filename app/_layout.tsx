import { Stack } from 'expo-router/stack';
import useColor, { StyleProvider, useTheme } from '../utils/useStyle';
import { ChatProvider } from '../components/chat/chatContext';

export default function AppLayout() {
  const theme = useTheme()
  const color = theme.color
  return (
    <ChatProvider>
      <StyleProvider>
        <Stack
          screenOptions={{
            statusBarStyle: theme.mode,
            statusBarColor: color.background as string,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </StyleProvider>
    </ChatProvider>
  );
}
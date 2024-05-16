import { View, Text } from 'react-native';
import useColor from '../../utils/useStyle';

import { ChatRecorder } from '../../components/chat/recording/chatRecorder';
import { Stack } from 'expo-router';

export default function Tab() {
  const colorscheme = useColor();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colorscheme.background, elevation: 0 }}>
      <Text>Home</Text>
    </View>
  );
}

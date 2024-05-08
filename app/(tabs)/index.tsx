import { View, Text } from 'react-native';
import useTheme from '../../utils/useStyle';

import { ChatRecorder } from '../../components/chat/recording/chatRecorder';

export default function Tab() {
  const colorscheme = useTheme();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colorscheme.background, elevation: 0 }}>
      <Text>Home</Text>
    </View>
  );
}

import { View, Text } from 'react-native';
import useTheme from '../../utils/useStyle';

import { RecordingTest } from '../../components/chat/recording/recordingTest';
import Message from '../../components/chat/message';
import AudioPlayer from '../../components/chat/recording/audioPlayer';
import { Audio } from 'expo-av';

export default function Tab() {
  const colorscheme = useTheme();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colorscheme.background, elevation: 0 }}>
    </View>
  );
}

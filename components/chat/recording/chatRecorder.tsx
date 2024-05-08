import { TouchableOpacity, TouchableNativeFeedback, ColorValue } from 'react-native';
import { useState } from 'react';
import { Audio } from 'expo-av';
import { useChat } from '../chatContext';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../../utils/useStyle';

type ChatRecorderProps = {
  size?: number,
  color?: ColorValue,
}

export function ChatRecorder({ size=24, color='black' }: ChatRecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const chat = useChat()

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    chat.sendAudio(uri, "user")
  }


  return (
    <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
      <Feather
        name={"mic"}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  )
}
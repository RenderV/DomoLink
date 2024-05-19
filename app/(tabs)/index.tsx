import { View, Text, TextInput } from 'react-native';
import useColor from '../../utils/useStyle';
import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../utils/useStyle';
import ConnectedChat from '../../components/chat/chatApi';
import { useRouter } from 'expo-router';
import { useRouteInfo } from 'expo-router/build/hooks';

export default function Chat() {
  const colorscheme = useColor();
  const styles = makeStyles(colorscheme);
  return (
    <View style={styles.container}>
      <ConnectedChat containerStyle={styles.messageContainer} />
    </View>
  );
}

const makeStyles = (colorscheme: ColorTheme) => StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: 'center',
    flex: 1,
    backgroundColor: colorscheme.background,
    elevation: 0
  },
  messageContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: "90%",
    height: "100%",
    bottom: 36,
    // backgroundColor: 'blue'
  },
})
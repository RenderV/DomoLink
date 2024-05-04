import { View, Text, TextInput } from 'react-native';
import useTheme from '../../utils/useStyle';
import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../utils/useStyle';
import ConnectedChat from '../../components/chat/chatApi';

export default function Tab() {
  const colorscheme = useTheme();
  const styles = makeStyles(colorscheme);
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
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
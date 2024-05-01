import { View, Text, TextInput } from 'react-native';
import useTheme from '../../utils/useStyle';
import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../utils/useStyle';

export default function Tab() {
  const colorscheme = useTheme();
  const styles = makeStyles(colorscheme);
  return (
    <View style={{ justifyContent: "flex-end", alignItems: 'center', flex: 1, backgroundColor: colorscheme.background, elevation: 0 }}>
      <Text>Chat</Text>
      <TextInput
        style={styles.chat}
      />
    </View>
  );
}

const makeStyles = (colorscheme: ColorTheme) => {
  return StyleSheet.create({
    chat: {
        backgroundColor: colorscheme.background,
        bottom: 0,
        color: colorscheme.iconsPrimary,
        borderColor: colorscheme.primary,
        borderWidth: 1,
        borderRadius: 10,
        width: "85%",
        height: 50
    },
  });
}
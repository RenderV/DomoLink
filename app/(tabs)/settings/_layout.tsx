import useColor from '../../../utils/useStyle';
import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../../utils/useStyle';
import { Stack } from 'expo-router';

export default function Tab() {
  const colorscheme = useColor();
  const styles = makeStyles(colorscheme);
  return (
    <Stack screenOptions={{
      contentStyle: styles.container,
    }}>
      <Stack.Screen name="index" options={{
        headerShown: false
      }}/>
    </Stack>
  );
}

const makeStyles = (colorscheme: ColorTheme) => StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: 'center',
    flex: 1,
    backgroundColor: colorscheme.background,
    elevation: 0
  },
})
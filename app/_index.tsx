import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/navbar';
import useTheme, { ColorTheme } from '../components/useStyle';
import { useMemo } from 'react';

export default function Page() {
  const color = useTheme()
  const styles = useMemo(() => makeStyleSheet(color), [color])
  return (
    <>
    <StatusBar backgroundColor={color.background as string} />
    <View style={styles.container}>
      <View style={styles.content}></View>
      {/* <Navbar /> */}
    </View>
    </>
  );
}

const makeStyleSheet = (colorScheme: ColorTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme.background,
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    content: {
      width: '100%',
      height: '95%',
      backgroundColor: colorScheme.background,
    },
  });
};
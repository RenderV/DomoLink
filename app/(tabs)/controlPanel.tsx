import { View, Text, StyleSheet } from 'react-native';
import useColor, { ColorTheme } from '../../utils/useStyle';
import SwitchActionButton from '../../components/home/actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const asyncWait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

export default function Tab() {
  const color = useColor()
  const style = makeStyles(color)

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.header}>Controle</Text>
      </View>
      <View style={style.content}>
        <SwitchActionButton
          icon={(state) => 
            {
              return <MaterialCommunityIcons name={state ? 'lightbulb-off-outline' : 'lightbulb-on'} size={35} color="white" />
            }
          }
          handleStateChange={async (state) => {
            await asyncWait(1000)
            return state
          }}
        />
      </View>
    </View>
  );
}


const makeStyles = (color: ColorTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    content: {
      width: "90%",
      height: 70,
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },
    action: {
      backgroundColor: color.modeSecondary,
      borderRadius: 20,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      width: "90%",
      marginBottom: 10,
      marginTop: 10,
      fontSize: 30,
      color: color.textColor,
      zIndex: 10,
      fontWeight: 'bold'
    },
    contentText: {
      color: color.textColor,
      fontSize: 15,
      margin: 10
    },
  })
}
import { StyleSheet, Text, View } from "react-native";
import useColor, { ColorTheme } from "../../../utils/useStyle";
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from "expo-router";

export type SettingMoreProps = {
}

export default function SettingMore({ }: SettingMoreProps) {
    const color = useColor()
    const styles = makeStyles(color)

    return (
        <View style={styles.container}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </View>
    )
}

const makeStyles = (color: ColorTheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            height: '100%',
            overflow: 'visible'
        }
    })
}
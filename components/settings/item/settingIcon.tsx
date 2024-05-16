import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColor, { ColorTheme } from "../../../utils/useStyle";

export type SettingContentProps = {
    name: string,
}

export default function SettingIcon({ name }: SettingContentProps) {
    const color = useColor()
    const styles = makeStyles(color)

    return (
        <View style={styles.icon}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={24} color={color.textColor} />
        </View>
    )
}

const makeStyles = (color: ColorTheme) => {
    return StyleSheet.create({
        icon: {
            flex: 1,
        }
    })
}
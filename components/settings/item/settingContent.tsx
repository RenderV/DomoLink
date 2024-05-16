import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColor, { ColorTheme } from "../../../utils/useStyle";

export type SettingContentProps = {
    children: string | JSX.Element | JSX.Element[]
}

export default function SettingContent({ children }: SettingContentProps) {
    const color = useColor()
    const styles = makeStyles(color)

    return (
        <View style={styles.content}>
            <Text style={styles.text}>
                {children}
            </Text>
        </View>
    )
}

const makeStyles = (color: ColorTheme) => {
    return StyleSheet.create({
        content: {
            flex: 8,
        },
        text: {
            color: color.textColor
        }
    })
}
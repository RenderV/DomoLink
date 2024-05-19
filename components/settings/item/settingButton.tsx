import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColor, { ColorTheme } from "../../../utils/useStyle";
import { Switch } from "react-native";
import { useState } from "react";

export type SettingSwitchProps = {
    initialValue?: boolean
    onValueChange?: (value: boolean) => void
}

export default function SettingSwitch({ onValueChange, initialValue=false }: SettingSwitchProps) {
    const color = useColor()
    const styles = makeStyles(color)

    const [isEnabled, setIsEnabled] = useState(initialValue);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        if(onValueChange) onValueChange(isEnabled)
    }

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: color.modeSecondary, true: color.accent }}
                thumbColor={color.textColor}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />

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
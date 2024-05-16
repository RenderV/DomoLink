import { View, Text, StyleSheet } from "react-native";
import useColor, { ColorTheme } from "../../../utils/useStyle";
import { Component, ReactElement } from "react";
import { SettingContentProps } from "./settingContent";

type SettingChild = (ReactElement<SettingContentProps, typeof Component>)

type SettingItemProp = {
    children: SettingChild | SettingChild[]
}

export default function SettingRoot({ children }: SettingItemProp) {
    const color = useColor()
    const styles = makeStyles(color)
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    )
}

const makeStyles = (colorscheme: ColorTheme) => {
    return StyleSheet.create(
        {
            container: {
                height: 50,
                width: "90%",
                backgroundColor: colorscheme.primary,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // overflow: 'visible',
            },
            content: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
                overflow: 'visible',
            },
        }
    )
}
import { View, Text, StyleSheet, Pressable } from "react-native";
import useColor, { ColorTheme } from "../../../utils/useStyle";
import { Component, ReactElement } from "react";
import { SettingContentProps } from "./settingContent";
import { router } from "expo-router";

type SettingChild = (ReactElement<SettingContentProps, typeof Component>)

type SettingItemProp = {
    children: SettingChild | SettingChild[]
    href?: string
}

export default function SettingRoot({ children, href }: SettingItemProp) {
    const color = useColor()
    const styles = makeStyles(color)
    const onPress = () => {
        if(href) router.navigate(href)
    }
    return (
        <Pressable style={styles.container} android_ripple={{
            color: color.background,
        }} onPress={onPress}>
            <View style={styles.content}>
                {children}
            </View>
        </Pressable>
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
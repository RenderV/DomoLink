import { Animated, Easing, GestureResponderEvent, GestureResponderHandlers, ImageProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { useEffect, useMemo, useRef, useState } from "react"
import useTheme, { ColorTheme } from "./useStyle"
import { AntDesign } from '@expo/vector-icons';

type NavbarIconProps = {
    source: any;
    selected?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    props?: any;
    style?: ViewStyle;
};

export function NavbarIcon({ source, selected, onPress, ...props }: NavbarIconProps) {

    const liftOffset = 30
    const translationY = selected ? -liftOffset : 0
    const navbarHeight = 5

    const liftAnimation = useRef(new Animated.Value(translationY)).current

    useEffect(() => {
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: 600,
            useNativeDriver: true
        }).start()
    }, [liftAnimation, translationY])

    const color = useTheme()

    // const styles = useMemo(() => makeStyleSheet(color), [color])

    return (
        <Animated.View style={[styles.navbarIcon, {
            transform: [{
                translateY: liftAnimation
            }]
        }]}>
            <TouchableOpacity onPress={onPress} {...props}>
                <View style={styles.imageContainer}>
                    <AntDesign name={source} size={navbarHeight * 4.4} color="black" />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    navbarIcon: {
        // position: "absolute",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 30
    },
    imageContainer: {
        position: "relative",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
})
import { Animated, Easing, GestureResponderEvent, GestureResponderHandlers, ImageProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { useEffect, useMemo, useRef, useState } from "react"
import useTheme, { ColorTheme } from "../../utils/useStyle"
import { AntDesign } from '@expo/vector-icons';

type NavbarIconProps = {
    source: any;
    size: number;
    selected?: boolean;
    props?: any;
    liftOffset?: number;
    style?: ViewStyle;
};

export function NavbarIcon({ source, selected, size, liftOffset, ...props }: NavbarIconProps) {

    const translationY = selected ? liftOffset : 0

    const liftAnimation = useRef(new Animated.Value(translationY)).current

    useEffect(() => {
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: 600,
            useNativeDriver: true
        }).start()
    }, [liftAnimation, translationY])

    return (
        <Animated.View style={[{
            transform: [{
                translateY: liftAnimation
            }]
        }]}>
            <TouchableOpacity {...props}>
                <AntDesign name={source} size={size} color="white" />
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
})
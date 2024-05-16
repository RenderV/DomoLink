import { Animated, Easing, GestureResponderEvent, GestureResponderHandlers, ImageProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import useColor, { ColorTheme } from "../../utils/useStyle"
import { AntDesign } from '@expo/vector-icons';

export type NavbarIconProps = {
    source: any;
    size: number;
    selected?: boolean;
    props?: any;
    liftOffset: number;
    children?: ReactNode | ReactNode[];
};

export function NavbarIcon({ source, selected, size, liftOffset, ...props }: NavbarIconProps) {

    const translationY = selected ? liftOffset : 0

    const liftAnimation = useRef(new Animated.Value(translationY)).current

    const colors = useColor()

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
            }],
            pointerEvents: selected ? 'auto' : 'none',
        }]}>
            <TouchableOpacity {...props}>
                <AntDesign name={source} size={size} color={colors.iconsPrimary} />
            </TouchableOpacity>
        </Animated.View>
    )
}

interface TransitionIconProps {
    transitionFrom: ReactNode;
    transitionTo: ReactNode;
    selected: boolean;
    liftOffset: number;
}

export function TransitionIcon({ transitionFrom, transitionTo, selected, liftOffset }: TransitionIconProps) {

    const [enableAnimation, setEnableAnimation] = useState(false)
    const duration = 300
    const [icon, setIcon] = useState(!selected ? transitionFrom : transitionTo)

    const translationY = selected ? liftOffset : 0
    const rotation = '180deg'

    const liftAnimation = useRef(new Animated.Value(translationY)).current
    const spinAnimation = useRef(new Animated.Value(0)).current
    const spin = spinAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', rotation]
    })

    const activeFirstStep = Animated.parallel([
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: duration,
            useNativeDriver: true
        }),
        Animated.timing(spinAnimation, {
            toValue: 0.5,
            duration: duration,
            useNativeDriver: true
        })
    ])

    const activeSecondStep = Animated.parallel([
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: duration,
            useNativeDriver: true
        }),
        Animated.timing(spinAnimation, {
            toValue: 1,
            duration: duration/3,
            useNativeDriver: true
        })
    ])

    const goBackFirstStep = Animated.parallel([
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: duration,
            useNativeDriver: true
        }),
        Animated.timing(spinAnimation, {
            toValue: 0.5,
            duration: duration,
            useNativeDriver: true
        })
    ])

    const goBackSecondStep = Animated.parallel([
        Animated.timing(liftAnimation, {
            easing: Easing.elastic(1),
            toValue: translationY,
            duration: duration/4,
            useNativeDriver: true
        }),
        Animated.timing(spinAnimation, {
            toValue: 0,
            duration: duration/3,
            useNativeDriver: true
        })
    ])

    useEffect(() => {
    }, [selected])

    useEffect(() => {
        if(!enableAnimation){
            setEnableAnimation(true)
            return
        }

        if(selected){
            activeFirstStep.start(() => {
                setIcon(transitionTo)
                activeSecondStep.start()
            })
            return () => {
                activeFirstStep.stop()
                activeSecondStep.stop()
            }
        }

        activeFirstStep.stop()
        activeSecondStep.stop()
        goBackFirstStep.start(() => {
            setIcon(transitionFrom)
            goBackSecondStep.start()
        })
        return () => {
            goBackFirstStep.stop()
            goBackSecondStep.stop()
        }
    }, [liftAnimation, translationY, selected])

    return (
        <Animated.View style={[{
            transform: [
            {
                translateY: liftAnimation,
            },
            {
                rotateY: spin,
            },
        ],
            pointerEvents: selected ? 'auto' : 'none',
        }]}>
                {icon}
        </Animated.View>
    )
}
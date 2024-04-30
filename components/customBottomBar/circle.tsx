import { useEffect, useRef } from "react"
import { Animated, ColorValue, Easing, View, ViewStyle } from "react-native"

type CircleProps = {
    diameter: number,
    color: ColorValue,
    style?: ViewStyle,
    props?: any
}

interface AnimatedCircleProps extends CircleProps {
    offset: number,
    duration?: number,
    enableAnimation?: boolean
}

export function Circle({ diameter, color, style, ...props }: CircleProps) {
    return (
        <View style={[style, {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            backgroundColor: color,
        }]} {...props} />
    )
}

export default function AnimatedCircle({ diameter, color, style, offset, duration = 600, enableAnimation = true, ...props }: AnimatedCircleProps) {

    const slideAnimation = useRef((new Animated.Value(offset))).current

    useEffect(() => {
        Animated.timing(slideAnimation, {
            easing: Easing.elastic(0.8),
            toValue: offset,
            duration: enableAnimation ? duration : 0,
            useNativeDriver: true
        }).start()
    }, [slideAnimation, offset, duration])

    return (
        <Animated.View style={[style, {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            backgroundColor: color,
            transform: [{ 
                translateX: enableAnimation ? slideAnimation : offset
            }]
        }]} {...props} />
    )
}
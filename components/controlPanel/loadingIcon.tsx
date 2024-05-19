import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

type LoadingIconProps = {
    size?: number,
    color?: string,
}

export function LoadingIcon({
    size = 30,
    color = "white",
}: LoadingIconProps) {
    const rotationAnim = useRef(new Animated.Value(0)).current

    const rotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        rotationAnim.setValue(0);
        Animated.loop(Animated.timing(rotationAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }),).start();
    }, [rotationAnim]);

    return (
        <Animated.View style={{
            transform: [{ rotate: rotation }]
        }}>
            <MaterialCommunityIcons name="loading" size={size} color={color} />
        </Animated.View>
    )
} 
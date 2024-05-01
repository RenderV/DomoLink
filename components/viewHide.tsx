import React, { useState, useEffect } from 'react';
import { View, Animated, ViewStyle } from 'react-native';

interface ViewHideProps {
    hideOn: boolean;
    offset?: number;
    children: React.ReactNode;
    style?: any;
}

const HideView =  ({ hideOn, offset = 100, children, style }: ViewHideProps) => {
    const [offsetAnim] = useState(new Animated.Value(hideOn ? offset : 0));

    useEffect(() => {
        Animated.timing(
            offsetAnim,
            {
                toValue: hideOn ? offset : 0,
                duration: hideOn ? 500 : 110,
                useNativeDriver: true
            }
        ).start();
    }, [hideOn]);

    return (
        <Animated.View
            style={[{ transform: [{ translateY: offsetAnim }]}, style]}>
            {children}
        </Animated.View>
    );
};

export default HideView;

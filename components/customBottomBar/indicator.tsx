import useColor from "../../utils/useStyle";
import { Svg, Path } from "react-native-svg";
import { Animated, ColorValue, Easing, ViewStyle } from "react-native";
import { useEffect, useRef } from "react";

const Indicator = (props: any) => {
    const colorscheme = useColor()
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 0H12.5H24C23.2426 0.192697 21.5 1.00081 21 3.00243C20.0337 6.87085 16.7329 11.1605 12 10.9954C7.2671 11.1605 3.96632 6.87085 3 3.00243C2.5 1.00081 0.757365 0.192697 0 0H11.5Z"
                fill={colorscheme.background}
            />
        </Svg>
    )
};

type AnimatedIndicatorProps = {
    width: number,
    height: number,
    offset: number,
    style: ViewStyle,
    enableAnimation: boolean,
    diameter: number,
    color: ColorValue,
    circleOffset: number,
    props?: any,
}

export const AnimatedIndicator = ({ width, height, offset, style, enableAnimation, diameter, color, circleOffset, ...props }: AnimatedIndicatorProps) => {

    const slideAnimation = useRef(new Animated.Value(offset)).current

    useEffect(() => {
        Animated.timing(slideAnimation, {
            easing: Easing.elastic(0.8),
            toValue: offset,
            duration: enableAnimation ? 500 : 0,
            useNativeDriver: true
        }).start()
    }, [slideAnimation, offset])

    return (
        <>
            <Animated.View style={{
                ...style,
                transform: [{
                    translateX: enableAnimation ? Animated.add(slideAnimation, -width/2) : offset
                }],
            }}>
                <Indicator
                    width={width}
                    height={height}
                    {...props}
                />
            </Animated.View>
            <Animated.View style={[style, {
                width: diameter,
                height: diameter,
                borderRadius: diameter / 2,
                backgroundColor: color,
                top: circleOffset,
                transform: [{
                    translateX: enableAnimation ? Animated.add(slideAnimation, -diameter/2-0.5) : offset,
                }]
            }]} {...props} />
        </>
    )
}

export default Indicator;
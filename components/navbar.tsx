import { Animated, Easing, GestureResponderEvent, GestureResponderHandlers, ImageProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { Image } from "react-native"
import { ImageSourcePropType } from "react-native"
import { Dimensions } from "react-native"
import Svg, { Path } from "react-native-svg";
import { useEffect, useMemo, useRef, useState } from "react"
import useTheme, { ColorTheme } from "./useStyle"
import { AntDesign } from '@expo/vector-icons';

const navbarHeight = 5
const liftOffset = navbarHeight*5
const wHeight = Dimensions.get('window').height

const Hole = (props: any) => {
    const colorscheme = useTheme()
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

type NavbarIconProps = {
    source: any;
    selected?: boolean;
    onPress: (event: GestureResponderEvent) => void;
    props?: any;
};

export function NavbarIcon({ source, selected, onPress, ...props }: NavbarIconProps) {

    const translationY = selected ? -liftOffset : 0

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

    const styles = useMemo(() => makeStyleSheet(color), [color])

    return (
        <Animated.View style={[styles.navbarIcon, {
            transform: [{
                translateY: liftAnimation
            }]
        }]}>
            <TouchableOpacity onPress={onPress} {...props}>
                <View style={styles.imageContainer}>
                    <AntDesign name={source} size={navbarHeight*4.4} color={color.iconsPrimary} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default function Navbar() {
    const paths = ["home", "message", "settings"]
    const base = "../assets/navbar/"
    // const icons = []
    // icons.push(require("../assets/navbar/home.png"))
    // icons.push(require("../assets/navbar/message.png"))
    // icons.push(require("../assets/navbar/settings.png"))
    const icons = ["home", "message1", "setting"]

    const circleRadius = Dimensions.get('window').height * navbarHeight / 100 / 2
    const itemWidth = Dimensions.get('window').width / icons.length

    const indicatorScale = { w: 1.5, h: 1.2 }
    const indicatorSize = (navbarHeight / 100 * wHeight)
    const indicatorOffset = (1 - indicatorScale.w) * indicatorSize / 2

    const [active, setActive] = useState(1)
    const activeOffsetLeft = active * itemWidth - circleRadius - itemWidth / 2

    const slideAnimation = useRef(new Animated.Value(activeOffsetLeft)).current

    const color = useTheme()
    const styles = useMemo(() => makeStyleSheet(color), [color])

    useEffect(() => {
        Animated.timing(slideAnimation, {
            easing: Easing.elastic(1),
            toValue: activeOffsetLeft,
            duration: 600,
            useNativeDriver: true
        }).start()
    }, [slideAnimation, activeOffsetLeft])


    return (
        <>
            <View style={styles.navbarBackground} />
            <View style={styles.navbarLayer}>
                <Animated.View style={{
                    transform: [{
                        translateX: Animated.add(slideAnimation, indicatorOffset)
                    }]
                }}>
                    <Hole width={indicatorSize * indicatorScale.w} height={indicatorSize * indicatorScale.h} />
                </Animated.View>
            </View>
            <View style={styles.navbarLayer}>
                <Animated.View style={{
                    transform: [{
                        translateX: slideAnimation
                    }, { translateY: -liftOffset }],
                }}>
                    <View style={styles.circle} />
                </Animated.View>
            </View>
            <View style={styles.navbarLayer}>
                {icons.map((icon, i) => (
                    <NavbarIcon source={icon} selected={active === i + 1} key={i} onPress={() => setActive(i + 1)} />)
                )}
            </View>
        </>
    )
}


const makeStyleSheet = (colorscheme: ColorTheme) => {
    const styles = StyleSheet.create({
        navbarIcon: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        imageContainer: {
            position: "relative",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        image: {
            flex: 1,
            aspectRatio: 0.5,
            resizeMode: 'contain',
        },
        circle: {
            position: 'absolute',
            width: (navbarHeight / 100) * wHeight,
            height: (navbarHeight / 100) * wHeight,
            borderRadius: ((navbarHeight / 100) * wHeight) / 2,
            backgroundColor: colorscheme.accent,
        },
        otherCircle: {
            position: 'absolute',
            width: (navbarHeight / 100) * wHeight,
            height: (navbarHeight / 100) * wHeight,
            borderRadius: ((navbarHeight / 100) * wHeight) / 2,
            backgroundColor: colorscheme.background,
            transform: [{ scale: 1.2 }]
        },
        navbarLayer: {
            position: "absolute",
            width: '100%',
            height: `${navbarHeight}%`,
            flexDirection: "row",
            bottom: 0,
        },
        navbarBackground: {
            width: '100%',
            height: `${navbarHeight}%`,
            backgroundColor: colorscheme.primary,
            flexDirection: "row",
            borderRadius: 12,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
        },
    });

    return styles;
};
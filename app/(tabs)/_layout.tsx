import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import useTheme, { ColorTheme } from '../../utils/useStyle';
import { NavbarIcon } from '../../components/customBottomBar/navbarIcon';
import { AnimatedIndicator } from '../../components/customBottomBar/indicator';
import useKeyboardIsActive from '../../utils/useKeyboardActive';
import HideView from '../../components/viewHide';

export default function TabLayout() {
    return (
        <CustomTab iconNames={["home", "message1", "setting"]}>
            <Tabs.Screen
                name="index"
            />
            <Tabs.Screen
                name="chat"
            />
            <Tabs.Screen
                name="settings"
            />
        </CustomTab>
    )
}

export type ConfigType = {
    barHeightPercentage: number,
    indicatorScale: { w: number, h: number },
    liftOffset: number,
}

type CustomTabProps = {
    children: any,
    config?: ConfigType,
    iconNames: String[]
}

export function CustomTab({ config, iconNames, children }: CustomTabProps) {

    if (iconNames.length !== children.length) {
        throw new Error("Number of icons must match number of children")
    }

    const colorscheme = useTheme()

    const [currentScreen, setCurrentScreen] = useState<number>(0)
    const previousScreen = useRef<number>(0)

    const keyboardActive = useKeyboardIsActive()

    useEffect(() => {
        if (currentScreen !== previousScreen.current) {
            previousScreen.current = currentScreen
        }
    }, [currentScreen])

    config = config || {
        barHeightPercentage: 5,
        indicatorScale: { w: 1.5, h: 1.1 },
        liftOffset: -28,
    }

    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height

    const barValues = {
        barHeight: config.barHeightPercentage / 100 * windowHeight,
        iconSize: config.barHeightPercentage * 4,
        sectionWidth: windowWidth / children.length,
    }

    const indicatorValues = {
        size: barValues.barHeight * config.indicatorScale.h,
    }

    const circleValues = {
        diameter: barValues.barHeight,
    }

    const positionValues = {
        indicatorOffset: (barValues.sectionWidth / 2) + currentScreen * barValues.sectionWidth,
        circleOffset: barValues.sectionWidth * currentScreen + barValues.sectionWidth / 2 - circleValues.diameter / 2,
    }

    const styles = useMemo(() => makeTabStyleSheet(colorscheme, config), [colorscheme, config])

    const icons = []

    if (children instanceof Array) {
        children.forEach((child, i) => {
            icons.push({ key: child.props.name, iconName: iconNames[i] })
        })
    } else {
        icons.push({ key: children.props.name, iconName: iconNames[0] })
    }


    return (
        <>
            <Tabs
                screenListeners={{
                    state: (state) => {
                        setCurrentScreen(state.data['state'].index)
                    }
                }}
                screenOptions={{
                    tabBarActiveTintColor: 'blue',
                    tabBarShowLabel: false,
                    tabBarIconStyle: {
                        display: 'none'
                    },
                    tabBarStyle: styles.tabBar,
                    headerStyle: {
                        backgroundColor: colorscheme.accent,
                    },
                    headerTitle: (props) => <View />,
                    tabBarHideOnKeyboard: true,
                }}
            >
                {children}
            </Tabs>
            <HideView style={[styles.tabBar, styles.indicatorBar]} hideOn={keyboardActive}>
                <AnimatedIndicator
                    width={indicatorValues.size * config.indicatorScale.w}
                    height={indicatorValues.size * config.indicatorScale.h}
                    offset={positionValues.indicatorOffset}
                    diameter={circleValues.diameter}
                    color={colorscheme.accent}
                    style={{
                        top: 0,
                        position: 'absolute',
                    }}
                    circleOffset={config.liftOffset}
                    enableAnimation={true}
                />
            </HideView>
            <HideView style={[styles.tabBar, styles.fakeBar]} hideOn={keyboardActive}>
                {icons.map((icon, i) => (
                    <NavbarIcon source={icon.iconName} size={barValues.iconSize} key={i} selected={currentScreen === i} liftOffset={config.liftOffset} />
                ))}
            </HideView>
        </>
    );
}

const makeTabStyleSheet = (colorscheme: ColorTheme, config: ConfigType) => {
    return StyleSheet.create({
        tabBar: {
            height: `${config.barHeightPercentage}%`,
            width: '100%',
            backgroundColor: colorscheme.primary,
            borderTopLeftRadius: 11,
            borderTopRightRadius: 11,
            bottom: 0,
            borderWidth: 0,
            elevation: 0,
            overflow: "visible",
            shadowOpacity: 1,
            borderTopWidth: 0,
            justifyContent: "space-around",
        },
        fakeBar: {
            position: "absolute",
            backgroundColor: 'transparent',
            alignItems: 'center',
            pointerEvents: 'none',
            flexDirection: 'row',
        },
        indicatorBar: {
            position: "absolute",
            backgroundColor: 'transparent',
            pointerEvents: 'none',
            alignItems: 'baseline',
        },
        indicatorCircle: {
            position: 'absolute',
            pointerEvents: 'none'
        }
    })
}
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import useTheme, { ColorBlack } from '../../components/useStyle';
import Indicator from '../../components/Indicator';
import { NavbarIcon } from '../../components/navbarIcon';
import { transform } from 'typescript';

export default function TabLayout() {
    const colorscheme = useTheme()
    const {height: wheight, width: wWidth} = useWindowDimensions()

    const barHeightPercentage = 5
    const barSize = (barHeightPercentage / 100) * wheight
    const indicatorScale = { w: 1.4, h: 1.2 }
    const indicatorSize = (barSize / 100 * barSize)
    const indicatorOffset = (1 - indicatorScale.w) * indicatorSize / 2

    const itemWidth = wWidth / 2
    const circleRadius = wheight * barHeightPercentage / 100 / 2

    const active: number = 1
    const activeOffsetLeft = active * itemWidth - circleRadius - itemWidth / 2

    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: `${barHeightPercentage}%`,
                    backgroundColor: colorscheme.primary,
                    // borderRadius: 6,
                    // borderEndEndRadius: 6,
                    borderTopLeftRadius: 11,
                    borderTopRightRadius: 11,
                    position: "absolute",
                    bottom: 0,
                    borderWidth: 0,
                    elevation: 0,
                    overflow: "visible",
                }
            }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color }) => <NavbarIcon source="home" selected={active === 1} />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarIcon: ({ color }) => <NavbarIcon source="setting" selected={active === 2} />,
                    }}
                />
            </Tabs>
            <View style={{
                height: `${barHeightPercentage}%`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                width: "100%",
                position: 'absolute',
                bottom: 0,
                zIndex: 10,
                pointerEvents: 'none',
            }}>
                <Indicator
                style={
                    {
                        position: 'absolute',
                        zIndex: 10,
                        left: activeOffsetLeft+indicatorOffset-4
                    }}
                    width={barSize * indicatorScale.w}
                    height={barSize * indicatorScale.h}>
                </Indicator>
            <NavbarIcon source="home" selected={active === 1}/>
            <NavbarIcon source="setting" selected={active === 2}/>
            </View>
        </>
    );
}

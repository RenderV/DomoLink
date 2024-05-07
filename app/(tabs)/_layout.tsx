import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import CustomTab from '../../components/customBottomBar/customTab';
import { NavbarIcon, TransitionIcon } from '../../components/customBottomBar/navbarIcon';
import { IconProps } from '../../components/customBottomBar/customTab';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../utils/useStyle';

export default function TabLayout() {
    const colors = useTheme()
    const icons = [
        (props: IconProps) => <NavbarIcon {...props} source={"home"} />,
        (props: IconProps) => (
            <TransitionIcon
                transitionFrom={<AntDesign size={props.size} name={"message1"} source={props.size} color={colors.iconsPrimary} />}
                transitionTo={<Feather size={props.size} name={"mic"} source={props.size} color={colors.iconsPrimary} />}
                selected={props.selected}
                liftOffset={props.liftOffset}
            />
        ),
        (props: IconProps) => <NavbarIcon {...props} source={"setting"} />,
    ]
    return (
        <CustomTab icons={icons}>
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

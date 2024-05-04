import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import CustomTab from '../../components/customBottomBar/customTab';

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

import { StyleSheet, View, Text } from "react-native";
import SettingItem from "../../../components/settings/item";
import { ColorLight, ColorTheme, useTheme } from "../../../utils/useStyle";
import { ColorBlack } from "../../../utils/useStyle";
import Profile from "../../../components/settings/profile";
import { Link } from "expo-router";

export default function Settings() {
    const theme = useTheme()
    const color = theme.color
    const style = makeStyles(color)

    return (
        // <Link href="/settings/test" style={{
        //     color: 'white',
        // }}>
        //     Go to Details
        // </Link>
        // <SettingItem/>
        <>
            <Profile size={70} />
            <Text style={style.personName}>
                Configurações
            </Text>
            <View style={style.settingItems}>

                <SettingItem.Root>
                    <SettingItem.Icon name="moon-waning-crescent" />
                    <SettingItem.Content>
                        Modo Escuro
                    </SettingItem.Content>
                    <SettingItem.Switch
                        onValueChange={(value) => theme.setDarkMode(!value)}
                        initialValue={theme.color === ColorBlack}
                    />
                </SettingItem.Root>

                <SettingItem.Root href="/settings/mykeys">
                    <SettingItem.Icon name="key" />
                    <SettingItem.Content>
                        Chaves de Acesso
                    </SettingItem.Content>
                    <SettingItem.More />
                </SettingItem.Root>

                <SettingItem.Root href="/settings/mydevices">
                    <SettingItem.Icon name="toy-brick-plus" />
                    <SettingItem.Content>
                        Dispositivos
                    </SettingItem.Content>
                    <SettingItem.More />
                </SettingItem.Root>

            </View>
        </>
    )
}

const makeStyles = (color: ColorTheme) => {
    return StyleSheet.create({
        container: {
            overflow: 'visible'
        },
        settingItems: {
            gap: 8
        },
        personName: {
            color: color.textColor,
            fontSize: 20,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 30
        }
    })
}
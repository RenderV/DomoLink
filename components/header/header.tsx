import { View } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { Text } from "react-native";

type HeaderProps = {
    title: string
}

export function Header({title}: HeaderProps){
    return(
        <View>
            <Text>{title}</Text>
            <Octicons name="person" size={24} color="white" />
        </View>
    )
}
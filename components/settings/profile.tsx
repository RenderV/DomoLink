import { View, Text } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import useColor from "../../utils/useStyle";

type ProfileProps = {
    size?: number
}

export default function Profile({size=50}: ProfileProps) {
    const color = useColor()
    return (
        <>
        <View style={{
            width: size*1.5,
            height: size*1.5,
            backgroundColor: color.iconsPrimary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: size,
        }}>
            <MaterialIcons name="person" size={size} color={color.background} />
        </View>
        </>
    )
}
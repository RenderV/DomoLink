import { Animated, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import useColor, { ColorTheme } from "../../../utils/useStyle";
import { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackSource, AVPlaybackStatusSuccess } from "expo-av";

type AudioPlayerProps = {
    soundSource?: string,
    soundObject?: Audio.Sound,
}

export default function AudioPlayer({ soundSource, soundObject }: AudioPlayerProps) {
    if (!soundSource && !soundObject) throw new Error('No sound source provided')
    const colors = useColor()
    const updateInterval = 100
    const pW = 200
    const styles = makeStyles(colors, pW)

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess | null>(null);
    const progress = status && status.durationMillis ? status.positionMillis / status.durationMillis : 0;

    const icon = status?.isPlaying ? 'pause' : 'play';

    const x = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(x, {
            toValue: progress,
            duration: updateInterval,
            useNativeDriver: true
        }).start()
    }, [progress])

    useEffect(() => {
        if (!sound) return
        // for some reason, the callback passed to createAsync is not called on browsers and on android after the update.
        // so I'm using setInterval
        const statusUpdater = setInterval(async () => {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) setStatus(status)

            if (status.isLoaded && status.didJustFinish) {
                setStatus(null)
                setSound(null)
            }
        }, updateInterval);
        return () => {
            clearInterval(statusUpdater)
            sound.unloadAsync()
        }

    }, [sound])

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync((soundSource ? { uri: soundSource } : soundObject) as AVPlaybackSource);

        setSound(sound);

        await sound?.playAsync()
    }

    async function changeTimestamp(e: GestureResponderEvent) {
        if (!status) return
        // durationMillis is infinity on the web
        if (!status?.durationMillis || status?.durationMillis === Infinity) return
        const progress = e.nativeEvent.locationX / pW
        sound?.setPositionAsync(progress * status.durationMillis)
    }

    async function handleButtonClick() {
        if (!sound) {
            await playSound()
            return
        }
        if (progress === 1) {
            sound?.replayAsync()
        }
        if (status?.isPlaying) {
            sound?.pauseAsync()
        }
        if (status?.isLoaded && !status?.isPlaying) {
            sound?.playAsync()
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleButtonClick}>
                <Ionicons name={icon} size={24} color={colors.iconsPrimary} />
            </TouchableOpacity>
            <View style={styles.progressHitBox}
                onStartShouldSetResponder={() => true}
                onResponderStart={changeTimestamp}
            >
                <View style={styles.progressBar}>
                    <Animated.View style={[styles.activeProgress, {
                        transform: [
                            {
                                translateX: Animated.add(x.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, pW]
                                }), -pW)
                            }
                        ]
                    }]}
                    />
                    <View style={[styles.inactiveProgress]} />
                </View>
            </View>
        </View>
    )
}

const makeStyles = (colors: ColorTheme, progressWidth: number) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        progressBar: {
            width: progressWidth,
            height: 5,
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'flex-start',
            justifyContent: "flex-start",
            flexDirection: 'row',
        },
        activeProgress: {
            backgroundColor: colors.iconsPrimary,
            height: '100%',
            width: progressWidth,
            position: 'relative',
            borderRadius: 10,
        },
        inactiveProgress: {
            backgroundColor: colors.iconsPrimary,
            opacity: 0.3,
            height: '90%',
            width: '100%',
            position: 'absolute',
        },
        progressHitBox: {
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
        }
    })
}
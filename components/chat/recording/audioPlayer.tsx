import { Animated, GestureResponderEvent, PanResponder, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import useTheme, { ColorTheme } from "../../../utils/useStyle";
import { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackSource, AVPlaybackStatusSuccess } from "expo-av";

type AudioPlayerProps = {
    soundSource?: string,
    soundObject?: Audio.Sound,
}

export default function AudioPlayer({ soundSource, soundObject }: AudioPlayerProps) {
    console.log(soundSource, soundObject)
    if (!soundSource && !soundObject) throw new Error('No sound source provided')
    const colors = useTheme()
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

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync((soundSource ? { uri: soundSource } : soundObject) as AVPlaybackSource,
            { shouldPlay: false }, (status) => {
                if (status.isLoaded) {
                    setStatus(status)
                    if (status.didJustFinish) {
                        setStatus(null)
                        setSound(null)
                    }
                }
            });
        sound.setProgressUpdateIntervalAsync(updateInterval)
        setSound(sound);
        await sound?.playAsync()
    }

    async function changeTimestamp(e: GestureResponderEvent) {
        if(!status) return
        if(!status?.durationMillis) throw new Error("Audio does not have duration data")
        const progress = e.nativeEvent.locationX / pW
        sound?.setPositionAsync(progress * status.durationMillis)
    }

    async function handleButtonClick() {
        if (!sound) {
            console.log('sound not loaded')
            await playSound()
            return
        }
        if (progress === 1) {
            console.log('restarting')
            sound?.replayAsync()
        }
        if (status?.isPlaying) {
            console.log('pausing')
            sound?.pauseAsync()
        }
        if (status?.isLoaded && !status?.isPlaying) {
            console.log('resuming')
            sound?.playAsync()
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

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
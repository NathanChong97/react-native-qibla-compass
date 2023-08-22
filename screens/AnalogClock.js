import React, { Component, useState } from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ToastAndroid
} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import Hand from "../components/Hand";
import { useInterval } from "../helpers/useInterval";
import { getTime } from "../helpers/time";
import Svg from "react-native-svg";

const frameWidth = 200;
const width = frameWidth / 1.25;
const diameter = width - 40;
const center = width / 2;
const radius = diameter / 2;

function AnalogClock(props) {

    let [time, setTime] = useState(getTime);

    useInterval(() => {
        setTime(getTime);
    }, 1000);

    return (
        <View style={styles.containerBase} >
            <View style={styles.clockContainer}>
                <ImageBackground
                    source={require('../assets/analogClock/clock_frame_night.png')}
                    style={[
                        styles.clockFrame,
                        { transform: [{ rotate: `${360 - props.compassHeading}deg` }] },
                    ]}>
                    <View
                        style={[
                            styles.compassPointerContainer,
                            { transform: [{ rotate: `${props.qiblad}deg` }] }
                        ]}>
                        <Image
                            source={require('../assets/compass_pointer.png')}
                            style={styles.compassPointer}
                        />
                    </View>
                </ImageBackground>
                <View style={styles.clockBackground}>
                    <ImageBackground
                        source={require('../assets/analogClock/clock_center.png')}
                        style={[
                            styles.clockCenter,
                        ]}>
                        <View style={styles.clockHandContainer}>
                            <Svg height={width} width={width}>
                                <Hand
                                    angle={time.seconds}
                                    center={center}
                                    radius={radius}
                                    stroke='red'
                                    strokeWidth='1'
                                />
                                <Hand
                                    angle={time.minutes}
                                    center={center}
                                    radius={radius}
                                    stroke='black'
                                    strokeWidth='3'
                                />
                                <Hand
                                    angle={time.hours}
                                    center={center}
                                    radius={radius / 1.4}
                                    stroke='black'
                                    strokeWidth='5'
                                />
                            </Svg>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </View>
    );
}

export default AnalogClock;


const styles = StyleSheet.create({
    containerBase: {
        backgroundColor: '#8dd123',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    clockContainer: {
        // width: '100%',
        backgroundColor: '#cc1245',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    clockFrame: {
        width: frameWidth,
        height: frameWidth,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockBackground: {
        width: frameWidth,
        height: frameWidth,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        //use position absolute to allow overlapping
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    clockCenter: {
        width: width,
        height: width,
        resizeMode: 'contain'
    },
    compassPointerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ccc',
        //use position absolute to allow overlapping
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    compassPointer: {
        marginBottom: '35%',
        resizeMode: 'center',
        flex: 1
    },
    clockHandContainer: {
        flex: 1,
        // backgroundColor: '#cccc',
        justifyContent: 'center',
        alignContent: 'center'
    },
});
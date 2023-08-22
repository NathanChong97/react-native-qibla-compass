import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import AnalogClock from './screens/AnalogClock';

class App extends Component {
  state = {
    compassHeading: 0,
    qiblad: 0,
  };

  componentDidMount() {
    this.getLocation();
    const degree_update_rate = 3;

    try {
      CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
        this.setState({ compassHeading: heading });
        console.warn("degree: ")
        ToastAndroid.showWithGravityAndOffset(
          "degree: " + heading,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          200,
        )
      });
    } catch (error) {
      console.log("error is: " + error)
      ToastAndroid.showWithGravityAndOffset(
        "error catch: " + error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        200,
      )
    }


    return () => {
      CompassHeading.stop();
    };
  }

  calculate = (latitude, longitude) => {
    const PI = Math.PI;
    let latk = (21.422487 * PI) / 180.0;
    let longk = (39.826206 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
        Math.sin(phi) * Math.cos(longk - lambda),
      );
    ToastAndroid.showWithGravityAndOffset(
      "qiblad: " + qiblad,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      200,
    )
    this.setState({ qiblad });
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        this.calculate(latitude, longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        ToastAndroid.showWithGravityAndOffset(
          "error getLocation: " + error.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          200,
        )
        // console.warn(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <ImageBackground
      //     source={require('./assets/kompas.png')}
      //     style={[
      //       styles.image,
      //       { transform: [{ rotate: `${360 - this.state.compassHeading}deg` }] },
      //     ]}>
      //     <View
      //       style={{
      //         flex: 1,
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         transform: [{ rotate: `${this.state.qiblad}deg` }],
      //       }}>
      //       <Image
      //         source={require('./assets/kakbah.png')}
      //         style={{ marginBottom: '45%', resizeMode: 'contain', flex: 0.7 }}
      //       />
      //     </View>
      //   </ImageBackground>
      // </View>
      <AnalogClock
        compassHeading={this.state.compassHeading}
        qiblad={this.state.qiblad}
      />
    );
  }
}

export default App;

const styles = StyleSheet.create({
  image: {
    flex: 0.5,
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#c42790',
    flex: 1,
  },
  //---------------
  containerBase: {
    backgroundColor: '#fff',
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockBackground: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    //----
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 20,
  },
  clockCenter: {
    width: 160,
    height: 160,
    resizeMode: 'contain'
  },
  compassPointerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ccc',
    position: 'absolute',
    top: -20,
    bottom: -20,
    right: -20,
    left: -20,
  },
  compassPointer: {
    marginBottom: '45%',
    resizeMode: 'center',
    flex: 1
  }
});

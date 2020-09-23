import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import styles from '../styles/Login';
const {width, height} = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      closeButtonOpacity: 1,
      mobileNumber: null,
    };
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    this.navToOTP = () => {
      this.props.navigation.navigate('OTP', {
        mobileNumber: this.state.mobileNumber,
      });
      this.setState({
        mobileNumber: null,
      });
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#202020',
          justifyContent: 'flex-end',
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgY}],
          }}>
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../assests/Theme.jpg')}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center'}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#555',
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                SIGN IN
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{translateY: this.textInputY}],
              backgroundColor: '#202020',
              height: height / 3 - 15,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View
                style={{
                  ...styles.closeButton,
                }}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{rotate: concat(this.rotateCross, 'deg')}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Mobile Number"
              style={styles.textInput}
              placeholderTextColor="black"
              keyboardType="numeric"
              maxLength={10}
              value={this.state.mobileNumber}
              onChangeText={num => {
                return this.setState({mobileNumber: num});
              }}
            />
            <TouchableOpacity
              onPress={() =>
                /* Navigate to another screen */
                this.navToOTP()
              }>
              <Animated.View
                style={{
                  ...styles.button,
                  height: 30,
                  borderWidth: 0.5,
                  borderColor: 'rgba(0,0,0,0.2)',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;

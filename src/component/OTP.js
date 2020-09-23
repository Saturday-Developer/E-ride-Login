import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import * as actionCreator from '../redux/actions';
import styles from '../styles/OTP';

class OTP extends Component {
  state = {
    mobileNumber: this.props.navigation.getParam('mobileNumber'),
  };
  render() {
    return (
      <ImageBackground
        source={require('../assests/Theme.jpg')}
        style={{
          ...StyleSheet.absoluteFill,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="#000"
            keyboardType="numeric"
            maxLength={4}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={{...styles.button, width: '50%'}}
            onPress={() => {
              this.props.saveNumber(this.state.mobileNumber);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    bgColor: state.ColorReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveNumber: number => {
      dispatch(actionCreator.saveNumber(number));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTP);

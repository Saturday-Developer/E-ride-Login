import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../component/Login';
import OTP from '../component/OTP';
import Test from '../component/Test';

const nav = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    OTP: {
      screen: OTP,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const mainNav = createAppContainer(nav);

export default mainNav;

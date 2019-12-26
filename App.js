import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MealScreen from './screens/Meals';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import AuthLoading from './screens/AuthLoading';
import Modal from './screens/Modal';

const OnBoardingNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  { initialRouteName: 'Login' }
);

const AppNavigator = createStackNavigator(
  {
    Meals: {
      screen: MealScreen,
    },
  },
  { initialRouteName: 'Meals' }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Modal: {
      screen: Modal,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const BaseStack = createSwitchNavigator(
  {
    AuthLoading,
    OnBoarding: OnBoardingNavigator,
    Root: RootStack,
  },
  { initialRouteName: 'AuthLoading' }
);

export default createAppContainer(BaseStack);

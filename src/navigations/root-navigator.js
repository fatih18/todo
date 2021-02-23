import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, LoginScene, RegisterScene} from '../scenes/index';

const Root = createStackNavigator();

const RootNavigator = ({navigation}) => (
  <Root.Navigator headerMode="none">
    <Root.Screen name="SplashScreen" component={SplashScreen} />

    <Root.Screen name="Login" component={LoginScene} />

    <Root.Screen name="Register" component={RegisterScene} />
  </Root.Navigator>
);

export default RootNavigator;

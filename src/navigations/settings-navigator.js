import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {LoginScene, RegisterScene, SettingsScene, HomeScene, Profile} from '../scenes/index';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const initialRouteName = 'Settings';

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ffcccb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScene}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={32}
              backgroundColor="#ffcccb"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;

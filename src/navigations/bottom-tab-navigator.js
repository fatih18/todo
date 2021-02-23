import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AppNavigator from './app-navigator';
import SettingNavigator from './settings-navigator';
import TodoNavigator from './todo-navigator';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: '#009387'}}
      activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoNavigator}
        options={{
          tabBarLabel: '',

          tabBarIcon: ({color}) => <Icon name="list" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          tabBarLabel: '',

          tabBarIcon: ({color}) => <Icon name="settings" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

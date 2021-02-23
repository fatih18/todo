import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme, IconButton} from 'react-native-paper';
import {HomeScene, Profile, Todo, TodoDetail, ChangePassword} from '../scenes/index';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const initialRouteName = 'Home';

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScene}
        options={{
          title: 'Todo',
          headerLeft: () => (
            <IconButton
              icon="menu"
              size={32}
              backgroundColor={theme.colors.background}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <IconButton icon="chevron-left" size={32} onPress={() => navigation.goBack()} />
          ),
        }}
      />

      <Stack.Screen
        name="Todo"
        component={Todo}
        options={{
          title: '',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={32}
              backgroundColor={theme.colors.background}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TodoDetail"
        component={TodoDetail}
        options={{
          title: '',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={32}
              backgroundColor={theme.colors.background}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

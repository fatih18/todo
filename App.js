import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import React, {useState, useCallback, useEffect, useMemo} from 'react';

import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import merge from 'deepmerge';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigator from './src/navigations/app-navigator';
import {AuthContext, useAuth} from './src/contexts/auth';
import Content from './src/scenes/content';
import RootNavigator from './src/navigations/root-navigator';

import {ThemeContext} from './src/contexts/theme';
import {setActiveUser} from './src/redux/actions/user';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
  const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

  const [isThemeDark, setIsThemeDark] = useState(false);

  const {mode} = useSelector((state) => state.themeReducer);

  const theme = mode === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const reduxDispatch = useDispatch();
  const activeUser = useSelector((state) => state.userReducer.activeUser);

  const authContext = React.useMemo(
    () => ({
      login: async ({username, id}) => {
        try {
          console.log('reduxDispatch', username);
          reduxDispatch(setActiveUser({username, id}));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
      },
      signOut: async () => {
        try {
          reduxDispatch(setActiveUser());
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      register: async (username, password) => {
        const userToken = 'adana';
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'REGISTER'});
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {activeUser != null ? (
              <Drawer.Navigator drawerContent={(props) => <Content {...props} />}>
                <Drawer.Screen name="Homeles" component={AppNavigator} />
              </Drawer.Navigator>
            ) : (
              <RootNavigator />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

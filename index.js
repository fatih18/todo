import './wdyr';
import 'react-native-gesture-handler';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {AppRegistry, StatusBar, Platform} from 'react-native';
import {PushNotificationIOS} from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import App from './App';

PushNotification.createChannel(
  {
    channelId: '123', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  onRegister(token) {
    console.log('TOKEN:', token);
  },

  onNotification(notification) {
    console.log('NOTIFICATION:', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default function Main() {
  return (
    <StoreProvider store={store}>
      <StatusBar />
      <App />
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

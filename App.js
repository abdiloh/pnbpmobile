/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {  useEffect } from 'react';
import Dasboard from './src/index'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import {Notifications} from 'react-native-notifications';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide()

    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification,completion) => {
      Notifications.postLocalNotification({
        body: notification.payload['gcm.notification.body'],
        title: notification.payload['gcm.notification.title'],
      });
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      // console.log(`Notification opened: ${notification.payload}`);
      completion();
    });

    Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion: (response: NotificationCompletion) => void) => {
      completion({alert: false, sound: true});
    });

  },[])
  
  return (
    <NavigationContainer>
     {Dasboard()}
    </NavigationContainer>
  )
};


export default App;

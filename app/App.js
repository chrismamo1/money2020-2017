import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Login from './Login.js'
import Drawer from './Drawer.js'

import { NativeModules } from 'react-native';
const { RNHce } = NativeModules;

Navigation.registerComponent('comprpay.Drawer', () => Drawer);
Navigation.registerComponent('comprpay.Login', () => Login);
/*
Navigation.registerComponent('comprpay.List', () => List);
Navigation.registerComponent('comprpay.Nfc', () => Nfc);
*/
Navigation.registerComponent('comprpay.List', () => Login);
Navigation.registerComponent('comprpay.Nfc', () => Login);


Navigation.startSingleScreenApp({
    screen: {
        screen: 'comprpay.Login', // unique ID registered with Navigation.registerScreen
        title: 'Login', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    passProps: {},
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    appStyle: {
        tabBarBackgroundColor: '#003a66',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#ffffff',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#003a66',
        navBarBackgroundColor: '#003a66',
        statusBarColor: '#002b4c',
    },
    drawer: {
        left: {
            screen: 'comprpay.Drawer'
        }
    }
});

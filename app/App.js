import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import AppLogin from './AppLogin.js'
import Drawer from './Drawer.js'

import { NativeModules } from 'react-native';
const { RNHce } = NativeModules;

Navigation.registerComponent('comprpay.Drawer', () => Drawer);
Navigation.registerComponent('comprpay.Login', () => AppLogin);
/*
Navigation.registerComponent('comprpay.List', () => List);
Navigation.registerComponent('comprpay.Nfc', () => Nfc);
*/
Navigation.registerComponent('comprpay.List', () => AppLogin);
Navigation.registerComponent('comprpay.Nfc', () => AppLogin);


Navigation.startSingleScreenApp({
    screen: {
        screen: 'comprpay.Login', // unique ID registered with Navigation.registerScreen
        title: 'ComprPay', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    passProps: {},
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'slide-right',
    appStyle: {
        navBarButtonColor: '#ffffff',
        navBarTextColor: '#ffffff',
        navigationBarColor: '#003a66',
        statusBarColor: '#003a66',
    },
    drawer: {
        left: {
            screen: 'comprpay.Drawer'
        }
    }
});

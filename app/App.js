import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import AppLogin from './AppLogin.js'
import Drawer from './Drawer.js'
import List from './List.js'
import Pay from './Pay.js'

import { NativeModules } from 'react-native';
const { RNHce } = NativeModules;

Navigation.registerComponent('comprpay.Drawer', () => Drawer);
Navigation.registerComponent('comprpay.Login', () => AppLogin);
Navigation.registerComponent('comprpay.List', () => List);
Navigation.registerComponent('comprpay.Pay', () => Pay);


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
        navBarButtonColor: '#000',
        navBarTextColor: '#000',
        navigationBarColor: '#fff',
        statusBarColor: '#fff',
        statusBarTextColorScheme: 'dark'
    },
    drawer: {
        left: {
            screen: 'comprpay.Drawer'
        }
    }
});

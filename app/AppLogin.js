import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    StyleSheet,
    Button,
    TextInput,
    PixelRatio,
} from 'react-native';
import getMerchantList from './getMerchantList';

const {width} = Dimensions.get('window');


class AppLogin extends Component {

    static navigatorStyle = {
        drawUnderNavBar: true,

    };

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView contentContainerStyle={{
                height: "100%",
                flex: 1,
                justifyContent: "center",
            }}>
            <TextInput placeholder="compensator's ID"/>
            <TextInput placeholder="your ID"/>
            <TextInput placeholder="your password"/>
            <Button title="Login" onPress={
                () => {
                let merchants = getMerchantList();
    this.props.navigator.push({
        screen: "comprpay.List",
        title: "ComprPay",
        backButtonHidden: true,
        passProps: { merchants }
    });
                }
            }/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        paddingVertical: 30,
    },
    toolBarStyle: {
        top: 64,
        width: width,
        position: 'absolute',
        borderTopWidth: 0,
        height: 66,
        backgroundColor: 'transparent'

    }
});

export default AppLogin;

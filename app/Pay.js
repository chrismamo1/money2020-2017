import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {
    Alert,
    View,
    ScrollView,
    Dimensions,
    Text,
    StyleSheet,
    Button,
    TextInput,
    PixelRatio,
} from 'react-native';

const {width} = Dimensions.get('window');


class MyClass extends Component {

    static navigatorStyle = {
        drawUnderNavBar: true,

    };

    constructor(props){
        super(props);
    }

    _onPay() {
        this.props.navigator.pop()
    }

    render(){
        return (
            <ScrollView contentContainerStyle={{
                height: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
            <QRCode
                      value={this.props.item.pan}
                      size={250}
                      bgColor='black'
                      fgColor='white'/>
            <Text style={{
                fontSize: 15,
                margin: 20
            }}>Use this QR code to spend your funds
            </Text>
            <Button title="Done Paying" onPress={
                () => {
                this._onPay();
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

export default MyClass;

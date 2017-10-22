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
        Alert.alert("Error!");
        this.props.navigator.pop()
    }

    render(){
        return (
            <ScrollView contentContainerStyle={{
                height: "100%",
                flex: 1,
                justifyContent: "center",
            }}>
            <QRCode
                      value={"$2020"}
                      size={200}
                      bgColor='black'
                      fgColor='white'/>
                  </View>
            <Text style={{
                fontSize: 15,
                margin: 20
            }}>Please press the button to use your funds.</Text>
            <Button title="Pay" onPress={
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

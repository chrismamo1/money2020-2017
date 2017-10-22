import React, { Component } from 'react';
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
import getMerchantList from './getMerchantList';

const {width} = Dimensions.get('window');

function getPAN(username) {
    let url = 'https://onzepay.localtunnel.me/getUsablePan?user=' + username;
    return fetch(url).then((response) => response).catch((error) => { console.log("" + error); });
}

class AppLogin extends Component {

    static navigatorStyle = {
        drawUnderNavBar: true,

    };

    constructor(props) {
        super(props);
        this.state = {u: ""};
    }

    render(){
        return (
            <ScrollView contentContainerStyle={{
                height: "100%",
                    flex: 1,
                    justifyContent: "center",
            }}>
            <TextInput 
            placeholder="your name" 
            selectTextOnFocus={true} 
            onChangeText={(text)=>{this.setState(
                (previousState) => {
                    return {u: text};
                })
            }}/>
            <TextInput placeholder="your password" secureTextEntry={true}/>
            <Button title="Login" onPress={
                () => {
                    let merchants = getMerchantList();
                    getPAN(this.state.u).then(pan => {
                        Alert.alert(pan);
                        this.props.navigator.push({
                            screen: "comprpay.List",
                            title: "ComprPay",
                            backButtonHidden: true,
                            passProps: { merchants, pan }
                        })
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

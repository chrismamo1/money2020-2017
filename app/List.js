import React, { Component } from 'react';
import {
    FlatList,
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


class AppLogin extends Component {

    static navigatorStyle = {
        drawUnderNavBar: true,

    };

    constructor(props){
        super(props);
        console.log(props);
    }

    _onSelect(item) {
        this.props.navigator.push({
            screen: "comprpay.Pay",
            passProps: item
        });
    }

    render(){
        return (
            <FlatList
                snapToAlignment={'center'} 
            contentContainerStyle={{
                marginTop: 40
            }}
            data={[{key: 'm1', pan: 0}, {key: 'm2', pan: 2}]}
            renderItem={({item}) =>
                <View style={{
                    flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 100,
                }}>
                <Text>Merchant: {item.key}</Text>
                <Button title="PAY NOW" onPress={
                    () => {
                        this._onSelect(item);
                    }
                }/>
                </View>
            }
            />
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

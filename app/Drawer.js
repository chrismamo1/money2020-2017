import React from 'react';
import {Alert, BackHandler, StyleSheet, View, Button} from 'react-native';

class MyClass extends React.Component {

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left'
        });
    };

    render() {
        return (
        <View style={styles.container}>
            <Button style={[styles.button]} title="About Compr Pay" onPress={
                () => Alert.alert(
                    "About ComprPay",
                    "Made by ComprPay Team at Money2020 2017."
                )
            }/>
            <Button 
                style={[{alignSelf: 'flex-end'}, styles.button]}
                title="Logout" 
                onPress={() => BackHandler.exitApp()}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#aaa'
    },
    container: {
        flex: 1,
        width: 300,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
});

export default MyClass;

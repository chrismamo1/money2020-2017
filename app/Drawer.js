import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

class MyClass extends React.Component {

	toggleDrawer = () => {
		this.props.navigator.toggleDrawer({
			side: 'left'
		});
	};

	render() {
		return (
			<View style={styles.container}>
			<View style={styles.button}>
			</View>
			<View style={styles.button}>
			</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 300,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},
	button: {
		marginTop: 16
	}
});

export default MyClass;

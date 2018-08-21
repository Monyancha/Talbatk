import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";

export default class SingleCategory1 extends Component {
	render() {
		var styles = StyleSheet.create({
			text: {
				textAlign: 'center',
				backgroundColor: 'transparent',
				color: 'white',
				fontFamily: 'Droid Arabic Kufi',
				fontSize: 16
			},
			box: {
				alignSelf: 'center',
				height: 30,
				marginTop: 15,
				alignItems: 'center',
				justifyContent: 'center',

			},

		});
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<View
					style={{
						width: '5%', marginTop: 15, marginHorizontal: 5, backgroundColor: '#ebb70a'
					}}>
				</View>

				<View
					style={[styles.box, this.props.style, { backgroundColor: '#ebb70a' }]}>

					<Text style={styles.text}>{this.props.name}</Text>
				</View>
				<View
					style={{
						width: '5%', marginTop: 15, marginHorizontal: 5, backgroundColor: '#ebb70a'
					}}>
				</View>
			</View>
		);
	}
}

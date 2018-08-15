import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';

export default class OfferBox extends Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

					padding: 13,
					paddingHorizontal: 20
				}}
			>
				<Image
					style={{ flex: 1, height: 250, borderRadius: 10 }}
					source={{ uri: this.props.image }}
					resizeMode="contain"
				/>
				<Text
					style={{
						fontFamily: 'Droid Arabic Kufi',
						marginRight: 10,
						fontSize: 17,
						padding: 5,
						fontWeight: 'bold',
						textAlign: 'right'
					}}
				>
					{this.props.name}
				</Text>
				<Text
					style={{
						fontFamily: 'Droid Arabic Kufi',
						marginRight: 15,
						fontSize: 12,
						padding: 0,
						color: 'gray',
						textAlign: 'right'
					}}
				>
					{this.props.desc}
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: 'row'
					}}
				>
					<Text
						style={{
							marginLeft: 4,
							fontFamily: 'Droid Arabic Kufi',
							fontSize: 12,
							color: Colors.secondaryColor
						}}
					>
						{this.props.price} {this.props.price ? 'ر.س' : ''}
					</Text>
				</View>
			</View>
		);
	}
}

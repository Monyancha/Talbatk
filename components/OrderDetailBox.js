import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class OrderDetailBox extends Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
				<View style={{ flex: 1, paddingTop: 9, paddingRight: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>

						<Text style={{ fontFamily: 'Droid Arabic Kufi', fontSize: 15, textAlign: 'right', justifyContent: 'flex-end' }}>{this.props.name}</Text>


					</View>
					<View style={{ flex: 1 }}>
						<Text style={{ fontFamily: 'Droid Arabic Kufi', color: '#777777', fontSize: 12, textAlign: 'right' }}>{this.props.desc}</Text>
					</View>

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}>



						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="counter"
								size={20}
								color={Colors.secondaryColor}
							/>
							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'Droid Arabic Kufi',
									fontSize: 10,
									color: Colors.secondaryColor
								}}>
								{this.props.count} عدد
							</Text>
						</View>

						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="cash"
								size={20}
								color={Colors.secondaryColor}
							/>
							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'Droid Arabic Kufi',
									fontSize: 10,
									color: Colors.secondaryColor
								}}>
								{this.props.price} رس
							</Text>
						</View>




					</View>
				</View>

				<View style={{ flex: 0.5 }}>
					<Image
						source={{ uri: this.props.image }}
						style={{
							width: 100, height: 100, marginTop: 10, marginBottom: 11,
							marginRight: 4, borderRadius: 10
						}}
						resizeMode="contain"
					/>
				</View>
			</View>
		);
	}
}

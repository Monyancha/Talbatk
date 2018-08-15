import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

export default class TicketBox extends Component {
	statusIcon = (value) => {
		if (value == 0) {
			return "alert-outline"
		}
		else {
			return "check-circle"
		}
	}
	statusText = (value) => {
		if (value == 1) {
			return "لم يتم الرد بعد"
		}
		else if (value == -1) {
			return "مضافه"
		}
		else if (value == 2) {
			return "تم الرد"
		}
		else if (value == 1) {
			return "تم اغلاق التذكره"
		}
	}
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

					padding: 13,
					paddingHorizontal: 20,

				}}>

				<Text
					style={{
						fontFamily: 'Droid Arabic Kufi',
						marginRight: 10,
						fontSize: 17,
						padding: 5,
						fontWeight: 'bold',
						textAlign: 'right'
					}}>
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
					}}>
					{this.props.desc}
				</Text>
				{(this.props.status != -1) ? <View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'flex-start',
					}}>
					<MaterialCommunityIcons
						name={this.statusIcon(this.props.status)}
						size={22}
						color={Colors.secondaryColor}
					/>
					<Text
						style={{
							marginLeft: 4,
							fontFamily: 'Droid Arabic Kufi',
							fontSize: 12,
							color: Colors.secondaryColor
						}}>
						{this.statusText(this.props.status)}
					</Text>
				</View> : (
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'flex-start',
							}}>

							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'Droid Arabic Kufi',
									fontSize: 12,
									color: Colors.secondaryColor
								}}>
								العدد {this.props.count}
							</Text>

							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'Droid Arabic Kufi',
									fontSize: 12,
									color: Colors.secondaryColor
								}}>
								السعر {this.props.count * this.props.price} رس /
						</Text>

						</View>
					)}


			</View>
		);
	}
}

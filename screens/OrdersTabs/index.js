import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native'
import ScrollableTabView from "react-native-scrollable-tab-view";
import CurrentOrders from './CurrentOrders';
import OrdersHistory from './OrdersHistory';
import AdminOrders from './AdminOrders';
import { mainColor } from '../../constants/Colors';

export default class OrdersTabs extends Component {
	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				<ScrollableTabView
					ref="tabs"
					tabBarPosition='bottom'
					initialPage={0}
					tabBarUnderlineStyle={{ height: 0 }}
					scrollWithoutAnimation={false}
					locked={true}
					renderTabBar={
						() => (
							<CustomTabComponent />
						)
					}>
					<CurrentOrders tabLabel={'الطلبات الحالية'} navigation={this.props.navigation} />
					<OrdersHistory tabLabel={'الطلبات السابقة'} navigation={this.props.navigation} />
					<AdminOrders tabLabel={'صاحب المتجر'} navigation={this.props.navigation} />
				</ScrollableTabView>
			</View>
		)
	}
}

// Custom component for scrollable tab view
class CustomTabComponent extends Component {
	renderTab = (name, page, isTabActive, onPressHandler) => {
		const textColor = isTabActive ? 'white' : mainColor;
		const fontWeight = 'normal';

		const tabStyle = isTabActive ? {
			backgroundColor: mainColor
		} : {
				backgroundColor: 'white',
				borderColor: mainColor,
				borderWidth: 1
			}

		return (
			<TouchableOpacity
				activeOpacity={0.7}
				style={{ flex: 1, }}
				key={name}
				onPress={() => onPressHandler(page)}
			>
				<View
					style={[
						CustomTabComponentStyles.tab,
						tabStyle
					]}>
					<Text style={{ color: textColor, fontWeight, fontFamily: 'Droid Arabic Kufi' }}>
						{name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		const containerWidth = this.props.containerWidth;
		const numberOfTabs = this.props.tabs.length;
		const tabUnderlineStyle = {
			position: 'absolute',
			width: containerWidth / numberOfTabs,
			height: 4,
			backgroundColor: 'navy',
			bottom: 0,
		};

		const translateX = this.props.scrollValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, containerWidth / numberOfTabs],
		});
		return (
			<View style={[CustomTabComponentStyles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
				{this.props.tabs.map((name, page) => {
					const isTabActive = this.props.activeTab === page;
					const renderTab = this.props.renderTab || this.renderTab;
					return this.renderTab(name, page, isTabActive, this.props.goToPage);
				})}
				<Animated.View
					style={[
						tabUnderlineStyle,
						{
							transform: [
								{ translateX },
							]
						},
						this.props.underlineStyle,
					]}
				/>
			</View>
		);
	}
}

const CustomTabComponentStyles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		paddingVertical: 6,
		marginHorizontal: 3,
	},
	tabs: {
		height: 57,
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 6,
	},
});
import React from 'react';
import { Platform, View, Text, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  BottomTabBar } from 'react-navigation-tabs';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import OffersTab from '../screens/OffersTab';
import SettingsScreen from '../screens/SettingsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersTabs from '../screens/OrdersTabs';
import Header from '../components/Header';

function cart() {
	AsyncStorage.getItem('cart').then((cart) => {
		if (cart) {
			return cart.split(",").length;
		}
		else {
			return 0;
		}
	})
}

const HomeStack = (props) => {
	const HomeStackNavigator = createStackNavigator({
		HomeScreen: {
			screen: () => <HomeScreen home_id={props.home_id} {...props} />,
			navigationOptions: {
				header: <Header navigation={props.navigation} />
			}
		}
	});

	return <HomeStackNavigator />;
}

const OffersStack = createStackNavigator({
	OffersTab: {
		screen: OffersTab,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const CartStack = createStackNavigator({
	CartScreen: {
		screen: CartScreen,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const SettingsStack = createStackNavigator({
	SettingsScreen: {
		screen: SettingsScreen,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

const OrdersStack = createStackNavigator({
	OrdersTabs: {
		screen: OrdersTabs,
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} />
		})
	}
});

export default createBottomTabNavigator(
	{
		مطاعم: {
			screen: (props) => <HomeStack home_id={props.navigation.state.params.id} {...props} />,
		},
		السله: {
			screen: CartStack,
		},
		طلبات: {
			screen: OrdersStack,
		},
		العروض: {
			screen: OffersStack,
		},
		اعدادات: {
			screen: SettingsStack,
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: null,
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let iconName;
				switch (routeName) {
					case 'مطاعم':
						iconName =
							Platform.OS === 'ios'
								? `ios-restaurant`
								: 'ios-restaurant';
						break;
					case 'طلبات':
						iconName =
							Platform.OS === 'ios'
								? `ios-paper`
								: 'md-paper';
						break;
					case 'اعدادات':
						iconName =
							Platform.OS === 'ios'
								? `ios-contact`
								: 'md-contact';
						break;
					case 'السله':
						return (
							<View
								style={{
									zIndex: 0,
									flex: 1,
									alignSelf: 'stretch',
									justifyContent: 'space-around',
									alignItems: 'center'
								}}
							>
								<Ionicons
									name={
										Platform.OS === 'ios'
											? `ios-cart`
											: 'md-cart'
									}
									size={32}
									style={{ marginBottom: -3 }}
									color={
										focused ? Colors.tabIconSelected : Colors.tabIconDefault
									}
								/>
								{(cart() >= 1) ? (
									<View
										style={{
											position: 'absolute',
											top: 5,
											right: 5,
											borderRadius: 50,
											backgroundColor: 'red',
											zIndex: 2
										}}
									>
										<Text
											style={{
												color: 'white',
												fontWeight: 'bold',
												padding: 5,
												textAlign: 'center',
												fontSize: 13,
												minHeight: 25,
												minWidth: 25
											}}
										>
											{cart()}
										</Text>
									</View>
								) : (
										undefined
									)}
							</View>
						);
						break;
					case 'العروض':
						iconName =
							Platform.OS === 'ios'
								? `ios-beer`
								: 'md-beer';
						break;
				}
				return (
					<Ionicons
						name={iconName}
						size={32}
						style={{ marginBottom: -3 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
				);
			}
		}),
		tabBarOptions: { showLabel: false },
		animationEnabled: false,
		swipeEnabled: true
	}
);

import { createBottomTabNavigator } from 'react-navigation';

import CurrentOrders from '../screens/orders/CurrentOrders';
import OrdersHistory from '../screens/orders/OrdersHistory';
import AdminOrders from '../screens/orders/AdminOrders';

export default createBottomTabNavigator(
	{
		'الطلبات الحالية': {
			screen: CurrentOrders
		},
		'الطلبات السابقة': {
			screen: OrdersHistory
		},
		'صاحب المتجر': {
			screen: AdminOrders
		}
	},
	{
		navigationOptions: () => ({
			header: null
		}),
		tabBarOptions: {
			showLabel: true,
			labelStyle: {
				fontWeight: '500',
				color: 'white',
				fontFamily: 'Droid Arabic Kufi',
				fontSize: 15,
				alignItems:'center',
				justifyContent:'center',
				textAlign:'center'
			},
			style: {
				backgroundColor: '#EBB70A'
			},
			activeTintColor: '#000'
		},
		animationEnabled: false,
		swipeEnabled: true
	}
);

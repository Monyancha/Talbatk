import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LocationSetting from '../screens/LocationSetting';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Restaurant from '../screens/Restaurant';
import CodeVerification from '../screens/CodeVerification';
import ResetPassword from '../screens/ResetPassword';
import MealsScreen from '../screens/MealsScreen';
import SingleMeal from '../screens/SingleMeal';
import SingleOffer from '../screens/SingleOffer';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import SingleTicketScreen from '../screens/SingleTicketScreen';
//import SingleOrderScreen from '../screens/SingleOrderScreen';
import FilterScreen from '../screens/FilterScreen';
import AddTicketScreen from '../screens/AddTicketScreen';
import AboutUs from '../screens/AboutUs';
import CategoriesScreen from '../screens/CategoriesScreen';
import IntroScreen from '../screens/IntroScreen';

import SpecialOrderScreen from '../screens/SpecialOrderScreen';

export default RootStackNavigator = createStackNavigator(
	{
		LocationSetting: { screen: LocationSetting },
		Signin: { screen: Signin },
		Signup: { screen: Signup },
		CodeVerification: { screen: CodeVerification },
		ResetPassword: { screen: ResetPassword },
		Home: { screen: MainTabNavigator },
		Restaurant: { screen: Restaurant },
		MealsScreen: { screen: MealsScreen },
		SingleMeal: { screen: SingleMeal },
		SingleOffer: { screen: SingleOffer },
		//SingleOrderScreen: { screen: SingleOrderScreen },
		SingleTicketScreen: { screen: SingleTicketScreen },
		MyTicketsScreen: { screen: MyTicketsScreen },
		FilterScreen: { screen: FilterScreen },
		AddTicketScreen: { screen: AddTicketScreen },
		AboutUs: { screen: AboutUs },
		SpecialOrderScreen: { screen: SpecialOrderScreen },
		CategoriesScreen: { screen: CategoriesScreen },
		Main: { screen: IntroScreen },
	},
	{
		navigationOptions: () => ({
			headerTitleStyle: {
				fontWeight: 'normal'
			}
		})
	}
);

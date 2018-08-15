import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LocationSetting from '../screens/LocationSetting';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import IntroScreen from '../screens/IntroScreen';
 import AboutUs from '../screens/AboutUs';
  import CodeVerification from '../screens/CodeVerification';
	import ResetPassword from '../screens/ResetPassword';

 import Restaurant from '../screens/Restaurant';
import MealsScreen from '../screens/MealsScreen';
import SingleMeal from '../screens/SingleMeal';
import SingleOffer from '../screens/SingleOffer';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import SingleTicketScreen from '../screens/SingleTicketScreen';
//import SingleOrderScreen from '../screens/SingleOrderScreen';
import FilterScreen from '../screens/FilterScreen';
import AddTicketScreen from '../screens/AddTicketScreen';
import SpecialOrderScreen from '../screens/SpecialOrderScreen';

export default RootStackNavigator = createStackNavigator(
	{
	//	AboutUs: { screen: AboutUs },
		LocationSetting: { screen: LocationSetting },
		Main: { screen: IntroScreen },
		 Signin: { screen: Signin },
		Signup: { screen: Signup },
		CodeVerification: { screen: CodeVerification },
		Home: { screen: MainTabNavigator },
		ResetPassword: { screen: ResetPassword },

		 Restaurant: { screen: Restaurant },
		 MealsScreen: { screen: MealsScreen },
		 SingleMeal: { screen: SingleMeal },
		 SingleOffer: { screen: SingleOffer },
		 //SingleOrderScreen: { screen: SingleOrderScreen },
		 SingleTicketScreen: { screen: SingleTicketScreen },
		 MyTicketsScreen: { screen: MyTicketsScreen },
		 FilterScreen: { screen: FilterScreen },
		 AddTicketScreen: { screen: AddTicketScreen },
		 SpecialOrderScreen: { screen: SpecialOrderScreen }


	},
	{
		navigationOptions: () => ({
			headerTitleStyle: {
				fontWeight: 'normal'
			}
		})
	}
);

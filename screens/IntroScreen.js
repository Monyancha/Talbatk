import React from 'react';
import { Image, AsyncStorage, Text, FlatList, TouchableOpacity, View, Dimensions, StatusBar, Platform } from 'react-native';
import Colors from '../constants/Colors';
import SingleCategory1 from '../components/SingleCategory1';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';
import firebase, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';

export default class Intro extends React.Component {
	static navigationOptions = () => ({
		title: 'الرئيسيه',
		header: null,
		headerTintColor: Colors.smoothGray,
		fontFamily: 'Droid Arabic Kufi',
		headerStyle: {
			backgroundColor: Colors.mainColor,
			borderBottomColor: Colors.mainColor,
			borderBottomWidth: 3,
		},
		headerTitleStyle: {
			fontWeight: '300',
			color: '#ffffff',
			fontFamily: 'Droid Arabic Kufi',
			fontSize: 16
		},
	});

	constructor(props) {
		super(props);
		firebase.messaging().getToken()
		.then(fcmToken => {
			if (fcmToken) {
				// user has a device token
				console.log('Got device token.')
				AsyncStorage.setItem('token',''+fcmToken);
				AsyncStorage.getItem('userid').then((userid)=>{
					fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
					'&token=' + fcmToken, { headers: { 'Cache-Control': 'no-cache' } }).
					then((res) => res.json()).then((res) => {
						console.log(fcmToken);
						console.log(res);
					})
				})

			} else {
				// user doesn't have a device token yet
				console.log('user does not have a token')
				fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
				'&token=' + "", { headers: { 'Cache-Control': 'no-cache' } }).
				then((res) => res.json()).then((res) => {
					console.log(fcmToken);
					console.log(res);
					// this.navigateToHome();
				})
			}
		});

		this.state = {
			doneFetches: 1,

			tabs: [{
				key: '1',
				screenName: 'المحلات التجارية',
				to: 'Home',
				id: 1
			},
			{
				key: '2',
				screenName: 'مندوب طلباتك',
				to: 'SpecialOrderScreen',
				id: 1
			}, {
				key: '3',
				screenName: 'خدمات طلباتك',
				to: 'Home',
				id: 2
			},
			{
				key: '4',
				screenName: 'المتاجر الشخصية',
				to: 'Home',
				id: 3
			}, {
				key: '5',
				screenName: 'الأسر المنتجة',
				to: 'Home',
				id: 4
			}],
			SpecialOrderStatus: 0,
			//image: 'https://pbs.twimg.com/media/DkXAIiKWsAAMRVJ.jpg:large'
			image: 'http://'
		}
	}

	componentWillMount() {
		StatusBar.setBarStyle('light-content')

		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(Colors.mainColor, true)
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('login').then(
			(logged) => {
				this.setState({ login_state: logged })
			}
		);

		fetch(
			Server.dest +
			'/api/special_orders_status'
		).then(res => res.json())
			.then(status => {
				this.setState({ SpecialOrderStatus: status.status })
			})
		fetch(
			Server.dest +
			'/api/image'
		).then(res => res.json())
			.then(status => {
				this.setState({ image: status.background })
			})
		// fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
		//    this.setState({ tabs: categories.response });
		//  });
		//  fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
		//     this.setState({
		//       Restaurant: [restaurants.response],
		//       doneFetches:1
		//     })
		//   })


		// Inneed      onPress={() => onPressHandler(page)

	}

	shouldRenderLoginButton = () => {
		if (this.state.login_state === undefined) {
			return null
		}
		else if (this.state.login_state === '1') {
			return null
		}
		else {
			return (
				<TouchableOpacity onPress={() => {
					AsyncStorage.setItem('SkippedLogin', '0');
					AsyncStorage.setItem('login', '0');
					this.props.navigation.navigate('Signin', {});
				}}
				>
					<View
						style={{
							alignSelf: 'center',
							height: 50,
							marginTop: 15,
							width: 150,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 50,
							backgroundColor: '#ebb70a'
						}}>
						<Text style={{
							textAlign: 'center',
							backgroundColor: 'transparent',
							color: 'white',
							fontFamily: 'Droid Arabic Kufi',
							fontSize: 16
						}}>تسجيل الدخول</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
				<View>
					<Image
						style={{
							backgroundColor: '#ccc',
							flex: 1,
							resizeMode: 'cover',
							position: 'absolute',
							width: '100%',
							height: Dimensions.get('window').height,
							justifyContent: 'center',
						}}
						source={{ uri: this.state.image }}
					/>

				</View>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{
						backgroundColor: 'white',
						borderColor: Colors.mainColor,
						borderWidth: 1,
						borderRadius: 20,
						width: '70%',
						alignSelf: 'center',
						marginTop: 20,
						height: '58%',
						marginTop: '35%'
					}}
					ListFooterComponent={this.shouldRenderLoginButton}
					contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: '15%' }}
					removeClippedSubviews={false}
					data={this.state.tabs}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => {
							if (item.to == 'SpecialOrderScreen') {
								if (this.state.SpecialOrderStatus == 0) {
									alert('الخدمه متوقفه الان')
								}
								else {
									this.props.navigation.navigate('SpecialOrderScreen')
								}
							}
							else {
								navigate(item.to, { id: item.id })
							}
						}
						} >
							<SingleCategory1
								style={{ alignSelf: 'center', width: '80%', justifyContent: 'center', alignItems: 'center' }}
								name={item.screenName}
							/>
						</TouchableOpacity>
					)}
				/>

			</View>
		);
	}
}

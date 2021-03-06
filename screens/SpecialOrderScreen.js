import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Alert,
	ActivityIndicator,
	AsyncStorage,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/Colors';
import Server from '../constants/server';
const { width, height } = Dimensions.get('window');
export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: { width, height },
			name: '',
			email: '',
			message: '',
			note: '',
			sending: false
		};
	}
	_onLayoutDidChange = (e) => {
		const layout = e.nativeEvent.layout;
		this.setState({ size: { width: layout.width, height: layout.height } });
	}
	_cancel = () => {
		Alert.alert(
			'تاكيد',
			'هل انت متاكد من الغاء الطلب',
			[
				{ text: 'لا', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'نعم', onPress: () => this.props.navigation.navigate('Main') },
			],
			{ cancelable: false }
		)
	}
	_sendEmail = () => {
		AsyncStorage.getItem('userid').then((userid) => {
			if (userid == null || userid == '' || !userid || userid == 'null') {


				Alert.alert(
					'تنبيه',
					'يجب تسجيل الدخول اولا',
					[
						{ text: 'موافق', onPress: () => this.props.navigation.navigate('Main') },
					],
					{ cancelable: false }
				)
			}
			else {


				AsyncStorage.getItem('location').then(location => {
					AsyncStorage.getItem('hint').then(hint => {
						var url = Server.dest + '/api/make-special-order?cost=' + this.state.email + '&note=' + location + '&restaurant=' + this.state.name + '&info=' + this.state.message + '&address=' + location + '&user_id=' + userid;
						fetch(url
							, { headers: { 'Cache-Control': 'no-cache' } })
							.then(res => res.json())
							.then(meals => {
								AsyncStorage.setItem('hot_request', '1').then(() => {
									this.props.navigation.navigate('Home',{id:1});
								})
							})
					})
				})


			}
		})


	}
	renderBtn() {
		if (this.state.sending == false) {
			return <Text style={{ fontFamily: 'Droid Arabic Kufi',backgroundColor: Colors.mainColor, borderRadius: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 18 }}>ارسل طلبك للمندوب</Text>
		} else {
			return <ActivityIndicator size='large' />
		}
	}
	static navigationOptions = ({ navigation }) => ({
		title: 'مندوب طلباتك',
		headerLeft: <MaterialCommunityIcons
			name="arrow-left"
			size={30}
			color='white'
			style={{ paddingLeft: 5 }}
			onPress={() => { navigation.navigate('Main') }} />,
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
	render() {
		const { navigate } = this.props.navigation;
		return (
			<ScrollView>
			<KeyboardAvoidingView
				behavior='padding'
				keyboardVerticalOffset={20}
				style={{ flex: 1 }}
				contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

				<View style={{ flex: 1, paddingTop: 1, backgroundColor: "white" }} onLayout={this._onLayoutDidChange}>

					<View style={{ marginHorizontal: 10 }}>
					<View  style={{borderColor: Colors.mainColor, borderWidth: 2, marginVertical: 7, borderRadius: 20, width: '100%', height: 50,justifyContent:'center' }}>
					<Text style={{fontFamily:'Droid Arabic Kufi',textAlign: 'center', color: Colors.secondaryColor, fontWeight: 'bold', color: '#11284b'}}>الأسعار تبدأ من 15 ريال</Text>
						</View>

						<TextInput style={{ borderColor: Colors.mainColor, borderWidth: 2, marginVertical: 7, borderRadius: 20, width: '100%', textAlign: 'center', color: Colors.secondaryColor, height: 50, fontWeight: 'bold', color: '#11284b' }}
							onChangeText={(name) => this.setState({ name })}
							placeholder="اسم المحل ( اختياري )"
							selectionColor="#11284b"
							underlineColorAndroid="transparent" />
						<TextInput style={{ fontFamily:'Droid Arabic Kufi',borderColor: Colors.mainColor, borderWidth: 2, marginVertical: 7, borderRadius: 20, width: '100%', textAlign: 'center', color: Colors.secondaryColor, height: 50, fontWeight: 'bold', color: '#11284b' }}
							onChangeText={(email) => this.setState({ email })}
							underlineColorAndroid="transparent"
							keyboardType='phone-pad'
							placeholder="السعر المتوقع ( إجباري )  " />

						<TextInput style={{ fontFamily:'Droid Arabic Kufi',borderColor: Colors.mainColor, borderWidth: 2, marginVertical: 7, borderRadius: 20, width: '100%', textAlign: 'center', color: Colors.secondaryColor, padding: 10, height: 150, fontWeight: 'bold', color: '#11284b' }}
							onChangeText={(message) => this.setState({ message })}
							placeholder="تفاصيل الطلب ( إجباري)"
							multiline={true}
							underlineColorAndroid="transparent" />
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								onPress={this._sendEmail}
								style={{}}>
								{this.renderBtn()}
							</TouchableOpacity>
							<TouchableOpacity
								onPress={this._cancel}
								style={{}}>
								<Text style={{ fontFamily:'Droid Arabic Kufi',backgroundColor: Colors.mainColor, borderRadius: 20, width: 180, color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 18, marginHorizontal: 10 }}>إلغاء الطلب</Text>
							</TouchableOpacity>
						</View>
					</View>

				</View>
				</KeyboardAvoidingView>
</ScrollView>
		);
	}
}

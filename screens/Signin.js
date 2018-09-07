import React from 'react';
import {
	Dimensions, KeyboardAvoidingView, AsyncStorage,
	StyleSheet, TextInput, View, Text, Image,
	Platform, TouchableOpacity,
	Alert
} from "react-native";
import { Button } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';
import firebase, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';

export default class Signin extends React.Component {
	componentDidMount() {
		this.notificationPermission();

		firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {

        }
	  });

		// notification listner
		this.pushNotiListner()

		// notification open
		this.onPushNotiOpen();
	}
	notificationPermission = () => {
		firebase.messaging().hasPermission()
		.then(enabled => {
			if (enabled) {
				// user has permissions
				console.log('Permission already granted.')
			} else {
				// user doesn't have permission
				console.log('No permission yet, Requesting...')
				firebase.messaging().requestPermission()
				.then(() => {
					// User has authorised
					console.log('Permission granted.')
				})
				.catch(error => {
					// User has rejected permissions
					console.log('permission denied')
					console.log(error)
				});
			}
		});
}
pushNotiListner = () => {
  this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
    // Process your notification as required
    console.log('three')
    console.log(notification)
    // Display the notification
    notification.android.setChannelId('test-channel');
    firebase.notifications().displayNotification(notification)
  });
  const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  .setDescription('My apps test channel');
  console.log(channel)
  // Create the channel
  firebase.notifications().android.createChannel(channel);
}
onPushNotiOpen = () => {
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    console.log('Notifications has been opend >>>>>>>>>>>>>>>>')
    // this.props.navigation.navigate('Notifications')
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification: Notification = notificationOpen.notification;
  });
}

	setLoginStatus = (value) => {
		AsyncStorage.setItem('login', value);
		this.setState({ 'login': value });
	}

	navigateToHome = () => {
		this.props.navigation.navigate('Main')
	};

	constructor(props) {
		super(props);
		this.state = {
			login: '1',
			SkippedLogin: '1',
			identifier: '',
			password: '',
			errorMsg: '',
		}

		AsyncStorage.getItem('SkippedLogin').then(
			(value) => {
				this.setState({ 'SkippedLogin': value })


					AsyncStorage.getItem('login').then(
						(logged) => {
							this.setState({ 'login': logged })

							if (logged == '1') {
								this.navigateToHome();
							}
						}
					);

			}
		);
	}

	loginUser = () => {
		if (this.state.password.length < 6) {
			this.setState({ errorMsg: 'كلمة المرور قصيرة جداً' });
			return;
		}

		if (this.state.identifier.length < 3) {
			this.setState({ errorMsg: 'بيانات دخول غير صالحة' });
			return;
		}

		if (/\s/g.test(this.state.identifier)) {
			this.setState({ errorMsg: 'غير مسوح بالمسافات' });
			return;
		}

		this.setState({ errorMsg: '' });

		fetch(Server.dest + '/api/signin?identifier=' + this.state.identifier +
			'&password=' + this.state.password, { headers: { 'Cache-Control': 'no-cache' } }).
			then((res) => res.json()).then((resJson) => {
				console.log("response" + resJson.response)
				if (resJson.response == 0)
					this.setState({ errorMsg: 'انت لست مُسجل عندنا او كلمة مرور غير صحيحة' });
				else if (resJson.response == -1)
					this.setState({ errorMsg: 'نعتذر و نقدر لك تعاونك ، و يؤسفنا حظر حسابك لعدة أسباب ، راجع إدارة التطبيق لإلغاء الحظر' });
				else {
					AsyncStorage.setItem('userid', resJson.response);
					this.setLoginStatus('1');
					this.storeFCMToken(resJson.response);
					 // this.navigateToHome();
				}
			})
	};

	storeFCMToken = (userid) => {
		firebase.messaging().getToken()
		.then(fcmToken => {
			if (fcmToken) {
				// user has a device token
				console.log('Got device token.')
				AsyncStorage.setItem('token',''+fcmToken);
				fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
				'&token=' + fcmToken, { headers: { 'Cache-Control': 'no-cache' } }).
				then((res) => res.json()).then((res) => {
					console.log(fcmToken);
					console.log(res);
					this.navigateToHome();
				})
			} else {
				// user doesn't have a device token yet
				console.log('user does not have a token')
				fetch(Server.dest + '/api/add-user-token?user_id=' + userid +
				'&token=' + "", { headers: { 'Cache-Control': 'no-cache' } }).
				then((res) => res.json()).then((res) => {
					console.log(fcmToken);
					console.log(res);
					this.navigateToHome();
				})
			}
		});
	}

	shouldRenderErrorMessage = () => {
		if (this.state.errorMsg != '') {
			return (
				<View style={{ paddingVertical: 3, flexDirection: 'row', justifyContent: 'center' }}>
					<Text style={{ fontFamily: 'Droid Arabic Kufi', color: '#E85151' }}>{this.state.errorMsg}</Text>
				</View>
			);
		}
	};

	static navigationOptions = {
		header: null
	};

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.login == '1' ) {
			return (
				<LoadingIndicator size="large" />
			);
		}
		else {
			return (
				<View style={{
					backgroundColor: '#FFFFFF',
					flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
					height: Dimensions.get('window').height, width: Dimensions.get('window').width
				}}>

					<Image
						style={{ flex: 1, height: '20%', width: '100%' }}
						resizeMode='cover'
						source={require('../assets/images/head.jpg')} />

					<KeyboardAvoidingView
						behavior='padding'
						keyboardVerticalOffset={60}
						style={{ flex: 1 }}
						contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

						<View style={styles.inputsContainer}>
							{this.shouldRenderErrorMessage()}

							<View style={styles.singleInputContainer}>
								<TextInput
									underlineColorAndroid='transparent'
									placeholder='اسم المستخدم أو الإيميل أو رقم الجوال'
									placeholderTextColor='#CCCCCC'
									autoGrow={false}
									multiline={false}
									autoFocus={false}
									style={styles.textInput}
									defaultValue={this.state.identifier}
									onChangeText={(text) => this.setState({ identifier: text })}
									onSubmitEditing={() => this.loginUser()} />

								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
									size={26}
									color={Colors.fadedMainColor}
									style={styles.inputIcon} />
							</View>

							<View style={styles.singleInputContainer}>
								<TextInput
									underlineColorAndroid='transparent'
									placeholder='كلمة المرور'
									placeholderTextColor='#CCCCCC'
									autoGrow={false}
									multiline={false}
									autoFocus={false}
									secureTextEntry={true}
									style={styles.textInput}
									onChangeText={(text) => this.setState({ password: text })}
									onSubmitEditing={() => this.loginUser()} />

								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
									size={26}
									color={Colors.fadedMainColor}
									style={styles.inputIcon} />
							</View>
						</View>
					</KeyboardAvoidingView>

					<View style={{ flex: 0.7, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ flex: 1 }}>
								<Button
									onPress={() => this.props.navigation.navigate("Signup")}
									color='white'
									backgroundColor={Colors.secondaryColor}
									containerViewStyle={{ borderRadius: 15 }}
									borderRadius={15}
									buttonStyle={{ padding: 10 }}
									textStyle={{ fontFamily: 'Droid Arabic Kufi' }}
									title="انشاء حساب جديد" />
							</View>

							<View style={{ flex: 1 }}>
								<Button
									onPress={() => {
										this.loginUser()
									}}
									color='white'
									backgroundColor={Colors.mainColor}
									containerViewStyle={{ borderRadius: 15 }}
									borderRadius={15}
									buttonStyle={{ padding: 10 }}
									textStyle={{ fontFamily: 'Droid Arabic Kufi' }}
									title="تسجيل دخول" />
							</View>
						</View>

						<TouchableOpacity style={{ flex: 1, marginTop: 7 }}
							onPress={() => {
								if (this.state.identifier.length != 10) {
									this.setState({ errorMsg: 'يجب ادخال رقم الجوال في أول خانة فقط بصيغة 0503455556 ثم اضغط نسيت كلمة المرور' });
									return;
								}
								if (/\s/g.test(this.state.identifier)) {
									this.setState({ errorMsg: 'غير مسوح بالمسافات' });
									return;
								}

								Alert.alert(
									'كلمة مرور جديدة',
									'سيتم ارسال رسالة على جوالك ' + this.state.identifier.substr(1) + ' توجهك الى وضع كلمة مرور جديدة',
									[
										{
											text: 'موافق', onPress: () => {
												fetch(Server.dest + '/api/requestnewpass?phone=' + this.state.identifier.substr(1),
													{ headers: { 'Cache-Control': 'no-cache' } }).
													then((res) => res.json()).then((resJson) => {
														if (resJson.response == 0) {
															this.setState({ errorMsg: 'هذا الحساب غير مسجل عندنا' });
														}
														else {
															this.props.navigation.navigate("CodeVerification", {
																process: 1 /* means RESET PASS*/,
																device: this.state.identifier.substr(1)
															});
														}
													})
											}
										},
										{ text: 'لا اوافق', onPress: () => { }, style: 'cancel' },
									],
									{ cancelable: true }
								);
							}}>
							<Text style={{ fontFamily: 'Droid Arabic Kufi', color: Colors.mainColor, marginTop: 10 }}>نسيت كلمة المرور؟</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.signupButtonContainer}>
						<View style={{ flex: 1, marginBottom: 13, width: '100%' }}>
							<Button
								onPress={() => {
									AsyncStorage.setItem('login', '0').then(() => {
										AsyncStorage.setItem('SkippedLogin', '1').then(() => {
											navigate('Main');
										});
									});
								}}
								color='white'
								backgroundColor={Colors.secondaryColor}
								borderRadius={15}
								buttonStyle={{ padding: 10 }}
								containerViewStyle={{
									marginLeft: 0,
									width: '100%', borderRadius: 15
								}}
								textStyle={{ fontFamily: 'Droid Arabic Kufi' }}
								title="استكمل كـزائر" />
						</View>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	textInput: {
		flex: 1,
		color: Colors.mainColor,
		textAlign: 'right',
		fontFamily: 'Droid Arabic Kufi',
		padding: 9,
		borderRadius: 4,
		backgroundColor: 'transparent',
		borderBottomColor: Colors.fadedMainColor,
		borderBottomWidth: 0.7
	},
	inputIcon: {
		backgroundColor: 'transparent',
		marginLeft: 9
	},
	inputsContainer: {
		flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	signupButtonContainer: {
		flex: 0.3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '92%'
	},
});

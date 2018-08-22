import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './navigation/RootNavigation';
import firebase, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';

// The following line is to temporarily hide a warning caused by
// https://github.com/facebook/react-native/issues/18868
// and it must be removed once the offical fix is released
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class App extends Component {
	componentWillUnmount() {
		// this.messageListener();
		this.notificationOpenedListener();
		// this.notificationDisplayedListener();
		this.notificationListener();
		// this.resetNotiOpen()
	  }
	  
		  componentDidMount() {
			SplashScreen.hide()
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
		//   this.props.navigation.navigate('Notifications')
		  // Get the action triggered by the notification being opened
		  const action = notificationOpen.action;
		  // Get information about the notification that was opened
		  const notification: Notification = notificationOpen.notification;
		});
	  }
	  
	render() {
		return <RootNavigation />
	}
} 
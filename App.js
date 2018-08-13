import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './navigation/RootNavigation';

// The following line is to temporarily hide a warning caused by
// https://github.com/facebook/react-native/issues/18868
// and it must be removed once the offical fix is released
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class App extends Component {
	componentDidMount() {
		//SplashScreen.hide()
	}

	render () {
		return <RootNavigation />
	}
} 
import React from 'react';
import { AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import { GiftedChat } from 'react-native-gifted-chat'
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SingleTicketScreen extends React.Component {
	state = {
		messages: [],
	}
	static navigationOptions = ({ navigation }) => ({
		title: 'الرسائل',
		headerLeft: <MaterialCommunityIcons
			name="arrow-left"
			size={30}
			color='white'
			style={{ paddingLeft: 5 }}
			onPress={() => { navigation.navigate('MyTicketsScreen') }} />,
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
	componentWillMount() {
		fetch(Server.dest + '/api/get-ticket-messages?ticket_id=0').then((res) => res.json()).then((messages) => {
			this.setState({
				doneFetches: 1,
				messages: messages.data
			})
		})



	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
		AsyncStorage.getItem('userid').then((userid) => {
			fetch(Server.dest + '/api/ticket-open?user_id=' + userid + '&message=' + messages[0].text + '&title=' + messages[0].text).then((res) => res.json()).then(() => {
			})
		})

	}

	render() {
		if (this.state.doneFetches == 0)
			return (<LoadingIndicator size="large" color="#B6E3C6" />);

		return (

			<GiftedChat
				messages={this.state.messages}
				onSend={messages => this.onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
		)
	}
}

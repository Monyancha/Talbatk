import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import SingleCategory from '../components/SingleCategory';
import LazyContainer from '../components/LazyContainer';
import RestaurantBox from '../components/RestaurantBox';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';

export default class Meals extends React.Component {
	static navigationOptions = () => ({
		title: 'الاقسام',
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
		this.state = {
			doneFetches: 0,
			tabs: [{
				key: 5,
				screenName: 'تحميل ...'
			},
			{
				key: 6,
				screenName: 'تحميل ...'
			}],
		}
	}

	componentDidMount() {
		fetch(Server.dest + '/api/store-categories?store_id=' + this.props.navigation.state.params.key).then((res) => res.json()).then((categories) => {
			this.setState({ tabs: categories.response });
		});
		fetch(Server.dest + '/api/store-info?store_id=' + this.props.navigation.state.params.key).then((res) => res.json()).then((restaurants) => {
			this.setState({
				Restaurant: [restaurants.response],
				doneFetches: 1
			})
		})


		// Inneed      onPress={() => onPressHandler(page)

	}

	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <View style={{ flex: 1, backgroundColor: 'white' }}><LoadingIndicator size="large" color="#B6E3C6" /></View>;

		return (
			<LazyContainer style={{ backgroundColor: Colors.smoothGray }}>
				<View>
					<FlatList
						automaticallyAdjustContentInsets={false}
						style={{ backgroundColor: 'white', borderBottomWidth: .3, borderBottomColor: 'black' }}
						removeClippedSubviews={false}
						ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} />}
						data={this.state.Restaurant}
						keyExtractor={item => String(item.key)}
						renderItem={({ item }) => (
							<RestaurantBox
								stars={item.stars}
								name={item.name}
								time={item.time}
								desc={item.desc}
								image={item.image}
								price={item.deliver_price}
								min_delivery_cost={item.min_delivery_cost}
							/>
						)}
					/>
				</View>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white', marginBottom: 125 }}
					removeClippedSubviews={false}
					data={this.state.tabs}
					keyExtractor={item => String(item.key)}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() =>
							navigate('MealsScreen', { category_id: item.key, restaurant_id: params.key })} >
							<SingleCategory
								name={item.screenName}
							/>
						</TouchableOpacity>
					)}
				/>
			</LazyContainer>
		);
	}
}

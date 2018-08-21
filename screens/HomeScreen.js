import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import RestaurantBox from '../components/RestaurantBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: false,
			Restaurants: [],
			userid: null,
			offer: {},
			SpecialOrderStatus: 0
		};

		this.currPage = 0;
		this.isLastPage = false;

		AsyncStorage.getItem('hot_request').then((value) => {
			if (value == '1') {
				AsyncStorage.setItem('hot_request', '0').then(() => {
					this.props.navigation.navigate('طلبات')
				})
			}
		})
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		fetch(
			Server.dest +
			'/api/stores?user_id=8' +
			'&maxcost=300' +
			'&maxtime=300' +
			'&sortby=2' +
			'&id=' + this.props.home_id +
			'&page=0'
		)
			.then(res => res.json())
			.then(restaurants => {
				this.setState({
					isFetching: false,
					Restaurants: restaurants.stores
				});
			});
	}

	fetchNextPage = (page) => {
		this.setState({ isFetching: true })

		fetch(
			Server.dest +
			'/api/stores?user_id=8' +
			'&maxcost=300' +
			'&maxtime=300' +
			'&sortby=2' +
			'&id=' + this.props.home_id +
			'&page=' + page
		)
			.then(res => res.json())
			.then(restaurants => {
				this.isLastPage = restaurants.stores.length < 6 ? true : false

				this.setState({
					isFetching: false,
					Restaurants: [...this.state.Restaurants, ...restaurants.stores]
				});
			});
	}

	/*componentDidMount() {
		AsyncStorage.getItem('userid').then(id => {
			// this._shouldRenderOffer(id);
			if (id == null) {
				var id = -1;
			}
			AsyncStorage.getItem('maxcost').then(maxcost => {
				if (maxcost == null) {
					maxcost = 0;
				}
				AsyncStorage.getItem('maxtime').then(maxtime => {
					if (maxtime == null) {
						maxtime = 0;
					}
					AsyncStorage.getItem('sortby').then(sortby => {
						if (sortby == null) {
							sortby = 3;
						}
						fetch(
							Server.dest +
							'/api/stores?user_id=8' +
							'&maxcost=300' +
							'&maxtime=300' +
							'&sortby=2' +
							'&id=' + this.props.home_id
						)
							.then(res => res.json())
							.then(restaurants => {
								this.setState({
									isFetching: false,
									Restaurants: restaurants.stores
								});
							});
					});
				});
			});
		});
	}*/

	// _shouldRenderOffer = id => {
	// 	fetch(`${Server.dest}/api/offers-for-me?user_id=${id}`)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			if (res.response != 0)
	// 				this.setState({ offerVisible: 1, userid: id, offer: res.response });
	// 			else this.setState({ offerVisible: 0 });
	// 		});
	// };

	// _RenderOffer = () => {
	// 	if (this.state.offerVisible == 1) {
	// 		return (
	// 			<View
	// 				style={{
	// 					position: 'absolute',
	// 					zIndex: 1,
	// 					backgroundColor: 'white',
	// 					borderRadius: 12,
	// 					overflow: 'hidden',
	// 					width: '90%',
	// 					left: '5%',
	// 					top: '10%',
	// 					height: '80%',
	// 					elevation: 1
	// 				}}
	// 			>
	// 				<Ionicons
	// 					onPress={() => this.setState({ offerVisible: 0 })}
	// 					name="ios-close"
	// 					size={50}
	// 					color="white"
	// 					style={{
	// 						position: 'absolute',
	// 						zIndex: 2,
	// 						right: 20,
	// 						marginVertical: 8
	// 					}}
	// 				/>
	//
	// 				<TouchableOpacity
	// 					style={{ flex: 1 }}
	// 					onPress={() =>
	// 						this.props.navigation.navigate('SingleOffer', {
	// 							offer_id: this.state.offer.id
	// 						})
	// 					}
	// 				>
	// 					<Image style={{ flex: 1 }} source={{ uri: this.state.offer.img }} />
	// 				</TouchableOpacity>
	//
	// 				<Button
	// 					onPress={() =>
	// 						this.props.navigation.navigate('SingleOffer', {
	// 							offer_id: this.state.offer.id
	// 						})
	// 					}
	// 					color={Colors.mainColor}
	// 					backgroundColor={Colors.mainColor}
	// 					containerViewStyle={{ borderRadius: 15 }}
	// 					borderRadius={15}
	// 					buttonStyle={{ padding: 10 }}
	// 					textStyle={{ fontFamily: 'Droid Arabic Kufi' }}
	// 					title="مشاهدة العرض"
	// 				/>
	// 			</View>
	// 		);
	// 	} else {
	// 		return;
	// 	}
	// };

	SpecialOrderNavigate = () => {
		if (this.state.SpecialOrderStatus == 0) {
			alert('الخدمه متوقفه الان')
		}
		else {
			this.props.navigation.navigate('SpecialOrderScreen')
		}
	}

	navigate_home = (key) => {

		this.props.navigation.navigate('CategoriesScreen', { key: key })

	}

	renderLoadingMore = () => {
		if(this.state.isFetching) {
			return <LoadingIndicator size="large" color="#B6E3C6" />
		}
		else return null
	}


	render() {
		if (this.state.isFetching && this.state.Restaurants.length < 1)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
					)}
					data={this.state.Restaurants}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (!this.isLastPage && !this.state.isFetching)
							this.fetchNextPage(++this.currPage)
					}}
					ListFooterComponent={this.renderLoadingMore}
					keyExtractor={item => String(item.key)}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => this.navigate_home(item.key, item.status)}>
							<RestaurantBox
								style={styles.restaurant}
								stars={item.stars}
								name={item.name}
								time={item.time}
								desc={item.desc}
								image={item.image}
								price={item.deliver_price}
								min_delivery_cost={item.min_delivery_cost}
								status={item.status}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'Droid Arabic Kufi',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	}
});
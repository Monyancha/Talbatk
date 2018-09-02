import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import RestaurantBox from '../components/RestaurantBox';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';
import LazyContainer from '../components/LazyContainer';

export default class Meals extends React.Component {
	static navigationOptions = () => ({
		title: 'الاصناف',
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
		const {params} = this.props.navigation.state
		this.state = {
			Restaurant: [{


				key: params.key,
			 name: params.name,
			 image:params.image,
			 time: params.time,
			 desc: params.desc,
			 stars: params.stars,
			 status: params.status,
			 deliver_price: params.deliver_price,
			 min_delivery_cost:params.min_delivery_price

		 }
			],
			Meals: [
				{
key: 10,
name: "جاري تحميل ..",
image: "http://132.148.244.83:90/assets/static/images/uploaded_images/store_images/products/product_10.jpg",
price: 60,
desc: "جاري تحميل .."
},
{
key: 9,
name: "جاري تحميل ..",
image: "http://132.148.244.83:90/assets/static/images/uploaded_images/store_images/products/product_9.jpg",
price: 40,
desc: "جاري تحميل .."
}
			],
			doneFetches: 1
		}
	}
	componentDidMount() {
		fetch(Server.dest + '/api/store-products?category_id=' + this.props.navigation.state.params.category_id + '&store_id=' + this.props.navigation.state.params.key).then((res) => res.json()).then((meals) => {
			this.setState({
				doneFetches: 1,
				Meals: meals.response
			})

		})
		// fetch(Server.dest + '/api/store-info?store_id=' + this.props.navigation.state.params.restaurant_id).then((res) => res.json()).then((restaurants) => {
		// 	this.setState({
		// 		Restaurant: [restaurants.response],
		// 		doneFetches: 1,
		//
		// 	})
		//
		// });
	}
	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;

		return (
			<LazyContainer>
				<View>
					<FlatList
						automaticallyAdjustContentInsets={false}
						style={{ backgroundColor: 'white', borderBottomWidth: .3, borderBottomColor: 'black' }}
						removeClippedSubviews={false}
						ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} />}
						keyExtractor={item => String(item.key)}
						data={this.state.Restaurant}
						renderItem={({ item }) => (
							<RestaurantBox
							stars={item.stars}
							name={item.name}
							time={item.time}
							desc={item.desc}
							image={item.image}
							price={item.deliver_price}
							min_delivery_cost={item.min_delivery_cost}
							status={item.status}
							/>
						)}
					/>
				</View>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white', marginBottom: 120 }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} />}
					keyExtractor={item => String(item.key)}
					data={this.state.Meals}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() =>
							navigate('SingleMeal', {
								 meal_id: item.key,
								 meal_name:item.name,
								 meal_image:item.image,
								 meal_price:item.price,
								 meal_desc:item.desc,
								 key: params.key,
				          name: params.name,
				          image:params.image,
				          time: params.time,
				          desc: params.desc,
				          stars: params.stars,
				          deliver_price: params.deliver_price,
									status: params.status,
									min_delivery_price:params.min_delivery_price,

								 })} >
							<MealBox
								name={item.name}
								time={item.time}
								desc={item.desc}
								image={item.image}
								price={item.price}
							/>
						</TouchableOpacity>
					)}
				/>
			</LazyContainer>
		);
	}
}

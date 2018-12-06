import React from 'react';
import { StyleSheet, Text, View} from 'react-native'
import MapView, {Marker} from 'react-native-maps';


export default class MapsScreen extends React.Component {
	static navigationOptions = {
		title: 'Map',
		headerTitleStyle: {
			color: '#ffffff',
		},
		headerStyle: {
			backgroundColor: '#9E5EE8',
		},
	};


	readUserData(){
		firebase.database().ref('events').once('value', function 
			(snapshot) {
				return(snapshot.val());
			});
	}

	constructor(props){
		super(props);
		console.disableYellowBox=true;
		this.state = {
		  	markers: [{
			    title: 'Ten Ren\'s Secret Meetup',
			    date: "2018-11-30 10:42",

				    coordinates: {
				    	latitude: 33.975651,
				    	longitude: -117.341459
				    },
				},

				{
				title: 'Cry about Finals',
				date: "2018-12-7 11:43",
					coordinates: {
			     		latitude:33.973489,
						longitude:-117.328171
				    },
				},
				

				{
				title: "Hike to the C!",
				date: "2018-11-30 21:22",
					coordinates: {
			     		latitude:33.975799,
						longitude:-117.309653
					},
				},

				{
				title: "Bbq",
				date: "2018-12-7 13:00",
					coordinates: {
			     		latitude:33.978571,
						longitude:-117.339542
					},
			
		  	}]
		}
	};

	render() {
		return (
			
			<View style={styles.container}>

				<MapView style={styles.map}
					region={{
						latitude: 33.975678,
						longitude: -117.326184,
						latitudeDelta:0.1,
						longitudeDelta:0.1
					}}
					>

					{this.state.markers.map( marker => (
						<MapView.Marker
							coordinate={marker.coordinates}
							title={marker.title}
							description={marker.date}
							/>
						))}
				</MapView>
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		marginTop:0,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'flex-end',
		alignItems: 'center'


	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	top: {

	}
});
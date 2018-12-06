
import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	Button,
	StatusBar,
	ScrollView,
} from 'react-native';
// import { createStackNavigator } from 'react-navigation';

import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component {

	static navigationOptions = {
		title: 'Profile',
		headerTitleStyle: {
			color: '#ffffff',
		},
		headerStyle: {
			backgroundColor: '#9E5EE8',
		},
	};


	constructor(){
	    super();
	    console.ignoredYellowBox = [
	      'Setting a timer'
	    ];  
	    this.database = firebase.database().ref().child('/users/' + firebase.auth().currentUser.uid); 
	    this.state = {
	      name: '',
	      email: '',
	      bio: '',
	      location: '',
	    }
	}

	componentWillMount(){
		this.startHeaderHeight = 100 + StatusBar.currentHeight;
		const profRef = firebase.storage().ref().child("profile_images/" + firebase.auth().currentUser.uid);
		const profURL = profRef.getDownloadURL().then((url) => {
			this.setState({
				profImageUrl: {uri: url}
			})
		}, (error) => {
			this.setState({
				profImageUrl: {uri: "https://firebasestorage.googleapis.com/v0/b/cs180-tgthr.appspot.com/o/profile_images%2Fdefault.png?alt=media&token=bb9e5182-8c81-4661-b78d-1340c2ba464d"}
			})
		});
		this.database.on('value', snap => {
		  this.setState({
		    name: snap.val().name,
		    email: snap.val().email,
		    bio: snap.val().bio,
		    location: snap.val().location,
		  });
		});
	}

	// componentWillUnmount() {
	//   firebase.database().ref('/users/' + firebase.auth().currentUser.uid).off('value', this.database);
	// }

	onEditProfilePress = () => {
		this.props.navigation.navigate("editProfile");
	}

	onSignoutPress = () => {
		firebase.auth().signOut();
	}
	  
	render() {
  	return(
		<ScrollView style={styles.container}>
    	<View style={styles.container}>
				{/* display profile picture */}
				{/* DONE FIX: figure out how to display image from database */}
				{/* FIX: figure out how to update image from database after uploading new one*/}
			<View style={styles.profileContainer}>
				<Image source={this.state.profImageUrl} style={styles.profileImage}/>
				<View>
					<Text style={styles.nameText}> {this.state.name} {/*firstName lastName */} </Text>
						<Text style={{marginLeft: 20, fontSize: 19}}>{this.state.location}{/* insert user information */} </Text>
					</View>
   			</View>

				{/* display user bio */}
			<View style={styles.informationContainer}>
					<Text style={styles.bioText}><Text>Bio: 
					</Text> {this.state.bio}</Text>

				{/* display profile information */}
				<Text style={styles.infoText}> Email: {this.state.email} {/* insert user information */}</Text>
			</View>

				{/* display social media connected */}
				{/* FIX: if connected then full color.
					if not then grey tone, */}
			<View style={styles.socialView}>
				<TouchableOpacity onPress={this.fbSocial}>
				   <Image style={styles.socialImage} source={require('../assets/images/profile/icons/facebook.png')}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.googleSocial} style={styles.socialButton}>
				   <Image style={styles.socialImage} source={require('../assets/images/profile/icons/google-plus.png')}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.twitterSocial} style={styles.socialButton}>
				   <Image style={styles.socialImage} source={require('../assets/images/profile/icons/twitter.png')}/>
				</TouchableOpacity>
			</View>

			<Button title="Edit Profile" onPress={this.onEditProfilePress.bind(this)} />
			<Button title="Sign out" onPress={this.onSignoutPress} />
		</View>
		</ScrollView>	
  	);
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer:{
		paddingTop: 20,
	},
	profileContainer:{
		flexDirection: 'row',
		marginTop: 40,
		margin: 15,
	},
	profileImage:{
		width:100,
		height:100,
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#fff',
		borderRadius:50,
		marginBottom: 5,
	},
	informationContainer:{
		alignItems: 'center',
		marginTop: 5,
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 15,
	},
	bioText:{
		alignItems: 'center',
		fontSize: 16,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 15,
	},
	nameText:{
		fontSize: 30,
		margin: 15,
		marginBottom: 5,
	},
	infoText:{
		fontSize: 19,
	},
	editProfile:{
		alignItems:'center',
		borderWidth: 1,
		padding: 10,
		borderColor: 'black',
    	// backgroundColor: 'blue',
    	borderRadius: 7,
		marginTop: 20,
		marginLeft: 30,
		marginRight: 30,
		flex:1,
	},
	socialView:{
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 30,
		marginBottom: 30,
	},
	socialImage:{
		flex: 1,
		width: 50,
		height: 50,
		alignItems: 'center',
		resizeMode: 'contain',
	},
});


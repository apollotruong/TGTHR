import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	Button,
	StatusBar,
	TextInput,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';


export default class editProfileScreen extends React.Component {

	constructor(){
    super();
	    console.ignoredYellowBox = [
	      'Setting a timer'
	    ];  
		this.database = firebase.database().ref().child('/users/' + firebase.auth().currentUser.uid);
		this.state = {
      name: '',
      email: '',
      password: '',
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

	onChooseImagePress = async () => {
		let result = await ImagePicker.launchImageLibraryAsync();

		if(!result.cancelled){
			this.uploadImage(result.uri, firebase.auth().currentUser.uid)
			.then(() => {
				Alert.alert("upload success");
			})
			.catch((error) => {
				Alert.alert(error);
			})
		}
  }

	uploadImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		var ref = firebase.storage().ref().child("profile_images/" + imageName);
		return ref.put(blob);
	}

  onSaveProfilePress = () => {
  	if(this.state.name != this.database.child('name')){
  		this.database.update({
  			name: this.state.name
  		});
  	}
  	if(this.state.email != this.database.child('email')){
  		this.database.update({
  			email: this.state.email
  		});
  	}
  	if(this.state.bio != this.database.child('bio')){
  		this.database.update({
  			bio: this.state.bio
  		});
  	}
  	if(this.state.location != this.database.child('location')){
  		this.database.update({
  			location: this.state.location
  		});
  	}
  	if(this.state.password != firebase.auth().currentUser.password && this.state.password){
  		firebase.auth().currentUser.updatePassword(this.state.password)
		};
    this.props.navigation.navigate("Profile");
  }

// default image not set to user
	deleteOKButton = () => {
		var userID = firebase.auth().currentUser.uid;
		firebase.auth().currentUser.delete().then(function () {
		  console.log('delete successful')
		  console.log(userID)
			firebase.database().ref().child('/users/'+ userID).remove();
			firebase.storage().ref().child("profile_images/" + userID).delete().catch(function(error){ });
	  	console.log('OK Pressed')
		}).catch(function (error) {
			Alert.alert('you need to have recently logged in.')
			console.log('cannot delete')
			console.log(error)
		})

	}

  onDeleteProfilePress = () => {
		Alert.alert(
		  'Delete Account',
		  'Are you sure??',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: 'OK', onPress: this.deleteOKButton},
		  ],
		  { cancelable: false }
		)
  }
	render() {
  	return(

		<KeyboardAvoidingView style={styles.container} behavior='padding'>
    	<View style={styles.container}>
				{/* edit profile picture */}
				{/* can upload but not show*/}
				<View style={styles.profileContainer}>
					<TouchableOpacity onPress = {this.onChooseImagePress}>
						<Image source={this.state.profImageUrl} style={styles.profileImage}  />
					</TouchableOpacity>
					<View>
						{/* edit firstName lastName */}
						<TextInput 
							style={styles.nameText} 
							value={this.state.name} 
							onChangeText={(name) => this.setState({name})}
						/>
						{/* edit user location */}
						<TextInput 
							style={{marginLeft: 20, fontSize: 19}} 
							onChangeText={(location) => this.setState({location})} 
							value={this.state.location}
						/>
					</View>
				</View>

				{/* edit user bio */}
				<View style={styles.informationContainer}>
					<Text>Bio: </Text>
					<TextInput 
						multiline={true}
						style={styles.bioText} 
						onChangeText={(bio) => this.setState({bio})}
						value={this.state.bio}
					/>

					{/* edit user email */}
					<Text> Email: </Text> 
					<TextInput 
						style={styles.infoText} 
						onChangeText={(email) => this.setState({email})}
						value={this.state.email} 
					/>
				</View>

					<Text> Change Password: </Text><TextInput 
						style={styles.infoText} 
            secureTextEntry={true}
            autoCapitalize="none"
						onChangeText={(password) => this.setState({password})}
						value={this.state.password} 
					/>
			<Button title="Save" onPress={this.onSaveProfilePress} />

			<Button title="DELETE ACCOUNT" onPress={this.onDeleteProfilePress} />
			</View>
		</KeyboardAvoidingView>	
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
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		width:100,
		height:100,
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

});
import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	Alert,
	StatusBar,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';

export default class createEventScreen extends React.Component {
    static navigationOptions = {
        title: 'New Event',
        headerTitleStyle: {
            color: '#9E5EE8',
        },
        headerStyle: {
            backgroundColor: '#FFFFFF',
        },
    };

    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
          ];
        this.database = firebase.database().ref().child('/users/' + firebase.auth().currentUser.uid + '/name'); 
	    this.state = {
          host: '',
          title: '',
          category: '',
          date: '',
          location: '',
          description: '',
          image: 'Upload Image',
        }
        this.pickImage = this.pickImage.bind(this);
    }

    componentWillMount() {
        this.startHeaderHeight = 100 + StatusBar.currentHeight;
        this.database.on('value', snap => {
            this.setState({
              host: snap.val(),
            });
        });
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true
          });
      if (!result.cancelled) {
            this.setState({
              image: result.uri,
            });
          }
    };

    uploadImage = async (uri, eventKey) => { 
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref("event_images/" + eventKey);
		return ref.put(blob);
    }
    
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
      }
      

    onCreateEventPress = () => {

        if(this.state.title == '') {
            Alert.alert("Title cannot be blank!");
            return;
        }
        if(this.state.category == '') {
            Alert.alert("Category cannot be blank!");
            return;
        }
        if(this.state.date == '') {
            Alert.alert("Date and time cannot be blank!");
            return;
        }
        if(this.state.location == '') {
            Alert.alert("Location cannot be blank!");
            return;
        }
        if(this.state.image == 'Upload Image') {
            Alert.alert("Please pick an image.");
            return;
        }
        
        //get a key for a new event
        var newPostKey = firebase.database().ref().child('events').push().key;

        //Upload Image to FireBase storage
        /*this.uploadImage(this.state.image, newPostKey)
        .then(() => {
            Alert.alert("upload success");
        })
        .catch((error) => {
            Alert.alert(error);
        })*/

        // let imageURL = '';
        /*let imageExt = this.getFileExtension(this.state.image);
        const imageRef = firebase.storage().ref("event_images/" + newPostKey + "." + imageExt);
        imageRef.getDownloadURL().then((url) => {
            // imageURL = url;
            this.setState({
                image: url
            });
        });*/

        var eventData = {
            host: this.state.host,
            title: this.state.title,
            category: this.state.category,
            date: this.state.date,
            location: this.state.location,
            description: this.state.description,
            image: this.state.image
        };

        //write the new event's data in the events list
        var updates = {};
        updates['/events/' + newPostKey] = eventData;

        firebase.database().ref().update(updates);

        Alert.alert("Event successfully created");

        this.props.navigation.navigate("Events"); //go back to Events page
    }

    render() {
        return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Title"
                        placeholderTextColor="grey"
                        underlineColorAndroid="transparent"
                        value={this.state.title}
                        onChangeText={(text) => { this.setState({title: text}) } }
                        />
                    </View> 
                    <View style={styles.inputContainer}>  
                    <TextInput style={styles.inputs}
                        placeholder="Category"
                        placeholderTextColor="grey"
                        underlineColorAndroid="transparent"
                        value={this.state.category}
                        onChangeText={(text) => { this.setState({category: text}) } }
                        />   
                    </View>
                    <View style={styles.inputContainer}> 
                    {/* <TextInput style={styles.inputs}
                        placeholder="Date"
                        placeholderTextColor="grey"
                        underlineColorAndroid="transparent"
                        value={this.state.date}
                        onChangeText={(text) => { this.setState({date: text}) } }
                        /> */}
                    <DatePicker
                        style={styles.inputs}
                        mode="datetime"
                        date={this.state.date}
                        //placeholder="Select date and time."
                        format="YYYY-MM-DD HH:mm"
                        //minDate={Date.now()}
                        //confirmBtnText="Confirm"
                        //cancelBtnText="Cancel"
                        allowFontScaling={false}
                        showIcon={true}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0,
                            }
                        }}
                        onDateChange={(datetime) => {this.setState({date: datetime})}}
                        />    
                    </View>    
                    <View style={styles.inputContainer}>    
                    <TextInput style={styles.inputs}
                        placeholder="Location"
                        placeholderTextColor="grey"
                        underlineColorAndroid="transparent"
                        value={this.state.location}
                        onChangeText={(text) => { this.setState({location: text}) } }
                        />        
                    </View>
                    <View style={styles.inputContainer2}>   
                    <TextInput style={styles.descriptionInputs}
                        multiline = {true}
                        scrollEnabled={false}
                        maxLength = {200}
                        placeholder="Description"
                        placeholderTextColor="grey"
                        underlineColorAndroid="transparent"
                        value={this.state.description}
                        onChangeText={(text) => { this.setState({description: text}) } }
                        />
                    </View>
                    <TouchableHighlight 
                    style={styles.inputContainer} 
                    onPress={this.pickImage}
                    underlayColor={'#dddddd'}>
                        <Text style={styles.imageInputs} numberOfLines={1}> 
                        {this.state.image}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                    style={styles.buttonContainer} 
                    onPress={this.onCreateEventPress}
                    underlayColor={'#af79ec'}>
                        <Text style={styles.signUpText}>Create</Text>
                    </TouchableHighlight> 
			</KeyboardAvoidingView>
		);
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
	contentContainer:{
        paddingTop: 20,
    },
    betterText: {
        fontSize: 24,
        marginBottom:20,
    },
    logoPic: {
        width: 200,
        height: 200,
        marginBottom: 300,
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:280,
        borderRadius:30,
        backgroundColor: "#9E5EE8",
    },
    buttonContainer2: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:280,
        borderRadius:30,
        backgroundColor: "#333",
    },
    signUpText: {
        color: 'white',
    },
    inputContainer: {
        backgroundColor: '#d9d9d9',
        borderRadius:30,
        width:280,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputContainer2: {
        backgroundColor: '#d9d9d9',
        borderRadius:15,
        width:280,
        height:100,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs: {
        height:45,
        marginLeft:16,
        flex:1,
    },
    descriptionInputs: {
        height:200,
        margin:15,
        flex:1,
    },
    imageInputs: {
        marginLeft:16,
        flex: 1
    }
});
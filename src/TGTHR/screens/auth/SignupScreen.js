import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Alert, Image, KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';

function writeUserData(userId, name, email, bio, location) {
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      bio: bio,
      location: location,
      // profile_picture : imageUrl
    });
    // const defaultFile = {uri: "https://firebasestorage.googleapis.com/v0/b/cs180-tgthr.appspot.com/o/profile_images%2Fdefault.png?alt=media&token=bb9e5182-8c81-4661-b78d-1340c2ba464d"};
    // var defaultFile = `../../assets/images/profile/default.png`;
    // // const defaultFile = "firebase.storage().ref().child('profile_images/default.png')";
    // var defaultRef = firebase.storage().ref().child('profile_images/' + userId);
    // // const getFile = defaultFile.uri.blob();
    // defaultRef.putFile(defaultFile), {contentType: 'image/png'};
}

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        header:null,
      };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            bio: "Hello!",
            location: "Somewhere nearby",
        };
    }

    onLoginPress = () => {
        this.props.navigation.navigate("Login");
    }

    onCreateAccountPress = () => {
        if(this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                writeUserData(firebase.auth().currentUser.uid, this.state.name, this.state.email, this.state.bio, this.state.location);
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    render () {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image style={styles.logoPic} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/cs180-tgthr.appspot.com/o/images%2Ftgthr%20logo.png?alt=media&token=4ace64b6-cc24-4e79-8960-c9a296e0ee19"}} />
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Name"
                    keyboardType="default"
                    autoCapitalize="words"
                    underlineColorAndroid='transparent'
                    onChangeText={(name) => this.setState({name})}/>
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    underlineColorAndroid='transparent'
                    onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}/>
                </View>
                <TouchableHighlight style={styles.buttonContainer} onPress={this.onCreateAccountPress}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight> 
                <Text style={{fontSize:12}}>Already have an account?</Text>
                <TouchableHighlight style={styles.buttonContainer2} underlayColor={"transparent"} onPress={this.onLoginPress}>
                    <Text style={[styles.signUpText, styles.font12]}>Login</Text>
                </TouchableHighlight> 
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    logoPic: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#9E5EE8",
    },
    buttonContainer2: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "transparent",
      },
    signUpText: {
      color: 'white',
    },
    font12: {
        fontSize: 12,
    }
  });
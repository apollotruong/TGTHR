import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, KeyboardAvoidingView, Image, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor(props) {
    	console.disableYellowBox=true;
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        
    }

    // click the login  button, go to login
    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }, (error) => {
            Alert.alert(error.message);
        });
    }

    // click the 'sign up' button, go to sign up. EZPZ
    onCreateAccountPress = () => {
        this.props.navigation.navigate("Signup");
    }
    onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword");
    }

    render () {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image style={styles.logoPic} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/cs180-tgthr.appspot.com/o/images%2Ftgthr%20logo.png?alt=media&token=4ace64b6-cc24-4e79-8960-c9a296e0ee19"}} />
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
                <TouchableHighlight style={styles.buttonContainer} onPress={this.onLoginPress}>
                    <Text style={styles.signUpText}>Login</Text>
                </TouchableHighlight> 
                <Text style={{fontSize:12}}>Don't have an account?</Text>
                <TouchableHighlight style={styles.buttonContainer2} underlayColor={"transparent"} onPress={this.onCreateAccountPress}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight> 
                <TouchableHighlight style={styles.buttonContainer2} underlayColor={"transparent"} onPress={this.onForgotPasswordPress}>
                    <Text style={styles.signUpText}>Forgot Password</Text>
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
    buttonContainer1: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "black",
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
        fontSize:12,
      color: 'white',
    }
  });
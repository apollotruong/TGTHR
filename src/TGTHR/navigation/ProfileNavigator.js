import { Notifications } from 'expo';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainSplashScreen from './../screens/auth/MainSplashScreen';
import ProfileScreen from './../screens/ProfileScreen';
import editProfileScreen from './../screens/components/edits/editProfileScreen';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen 
    	// navigationOptions:{
     //        title: "Profile",}
        },
    editProfile: { screen: editProfileScreen
        },

    MainSplash: { screen: MainSplashScreen },
  }
);

export default class ProfileNavigator extends React.Component {

  render() {
    return <ProfileStackNavigator />;
  }
}
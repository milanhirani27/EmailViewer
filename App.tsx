/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: "307200613332-g2lbqketnsseajmi2ekb32luucep24l6.apps.googleusercontent.com",
});

const App = () => {

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('success google login', userInfo);
      
    } catch (error) {
      console.log('error in google signin', error);
      
    }
  };
  
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}

export default App;

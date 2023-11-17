import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { ImapModule } = NativeModules;
const imapModuleEventEmitter = new NativeEventEmitter(ImapModule);

export const getEmailCount = (username, password) => {
    ImapModule.getEmailCount(username, password);
};

export const addEmailCountListener = (callback) => {
    return imapModuleEventEmitter.addListener('emailCount', callback);
};

const Dashboard = () => {
  const navigation = useNavigation();
  const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    const listener = addEmailCountListener((count) => {
      console.log("--1--", count);
      setEmailCount(count);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const handleGetEmailCount = () => {
    getEmailCount('harikumar11911@gmail.com', 'akdu jtag fbbk xwcf');
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('AuthScreen')
      //   setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error('error in logout', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={signOut}>
        <Text>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetEmailCount}>
        <Text>Get Email count: {emailCount}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard;
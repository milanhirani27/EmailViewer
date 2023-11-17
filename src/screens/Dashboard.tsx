import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();

    const signOut = async () => {
        try {
          await GoogleSignin.signOut();
          navigation.navigate('AuthScreen')
        //   setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error('error in logout',error);
        }
      };

    return (
        <View>
            <TouchableOpacity onPress={signOut}>
                <Text>LogOut</Text>
            </TouchableOpacity>
            <Text>Dashboard</Text>
        </View>
    )
}

export default Dashboard;
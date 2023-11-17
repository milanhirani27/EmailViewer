import React from 'react';
import {
    Linking,
    View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: "307200613332-g2lbqketnsseajmi2ekb32luucep24l6.apps.googleusercontent.com",
});

const AuthScreen = () => {
    const navigation = useNavigation();
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('success google login', userInfo);

            navigation.navigate("Dashboard");

        } catch (error) {
            console.log('error in google signin', error);

        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </View>
    );
}

export default AuthScreen;

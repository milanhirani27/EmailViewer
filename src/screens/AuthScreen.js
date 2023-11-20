import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

//Added webClientId from firebase
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/admin.reports.usage.readonly'],
    webClientId: "307200613332-g2lbqketnsseajmi2ekb32luucep24l6.apps.googleusercontent.com",
    offlineAccess: true,
});

const AuthScreen = ({navigation}) => {
    const [userData, setUserData] = useState({});

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('login data', userInfo);
            setUserData(userInfo);
            navigation.navigate("Dashboard", { username : userInfo.user.email});
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
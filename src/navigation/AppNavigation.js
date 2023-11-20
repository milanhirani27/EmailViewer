import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import Dashboard from '../screens/Dashboard';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const navigation = useNavigation();

    const signOut = async () => {
        try {
          await GoogleSignin.signOut();
          navigation.navigate('AuthScreen')
        } catch (error) {
          console.error('error in logout', error);
        }
      };
      
    return (
        <Stack.Navigator>
            <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={signOut}>
                        <Image
                            source={require('../../assets/icons8-logout-50.png')}
                            resizeMode="cover"
                            style={{
                                height: 25,
                                width: 25
                            }}
                        />
                    </TouchableOpacity>
                )
            }
            } />
        </Stack.Navigator>
    )
}

export default AppNavigation
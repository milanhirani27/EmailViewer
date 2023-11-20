import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { ImapModule } = NativeModules;
const imapModuleEventEmitter = new NativeEventEmitter(ImapModule);

export const getEmailCount = (username, password) => {
    ImapModule.getEmailCount(username, password);
};

export const addEmailCountListener = (callback) => {
    return imapModuleEventEmitter.addListener('emailCount', callback);
};

const Dashboard = ({route}) => {
  const username = route.params.username;
  const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    const listener = addEmailCountListener((count) => {
      console.log('---email-count--', count);
      setEmailCount(count);
    });
    handleGetEmailCount();

    return () => {
      listener.remove();
    };
  }, []);

  // Generate App Password using this URL = "https://myaccount.google.com/apppasswords"
  const handleGetEmailCount = () => {
    getEmailCount(username, 'byxh uywn rsdn whad');
  };
  
  return (
    <View style={{ flexDirection:'row', justifyContent:'flex-start',paddingTop:10, alignItems:'center'}}>
      <Text style={{ fontSize:20, color:'black'}}> Email count: {emailCount}</Text>
      <TouchableOpacity onPress={handleGetEmailCount} style={{ paddingLeft:10}}>
      <Image
         source={require('../../assets/refersh.png')}
         resizeMode="cover"
         style={{
             height: 25,
             width: 25,
         }}
     />                   
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard;
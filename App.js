import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as appjson from './app.json'

import * as Facebook from 'expo-facebook';

const loginWithFacebook = async () => {
  try {
    const response = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = response;

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const user = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await user.json()).name}!`);
    } else {
      Alert.alert('Login failed!', `Type: ${type}`);
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default function App() {
  useEffect(() => {
    const initFacebook = async () => {
      await Facebook.initializeAsync("263384934828090")
    }
    initFacebook()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Expo Login Testing App: Facebook v.{appjson.expo.version}</Text>
      <Button onPress={loginWithFacebook} title="Press Me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

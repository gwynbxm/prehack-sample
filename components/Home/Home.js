import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firebase  from '../../config';

export default function Home({navigation}) {
  
  console.log("Home user uid: " + firebase.auth().currentUser.uid)
  const signOut = () =>{
    firebase.auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  } 

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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

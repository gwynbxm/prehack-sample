import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import firebase  from '../../config';

export default function Loading({navigation}) {
  
  useEffect(() => {
    checkedIfLoggedIn()
  })

  checkedIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        navigation.navigate('Home')
      }else{
        navigation.navigate('Login')
      }
    })
  }
  return (
    <View style={styles.container, styles.horizontal}>
        <ActivityIndicator size="large" color="#00ff00"/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
});
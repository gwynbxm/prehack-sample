import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SnapshotViewIOSComponent } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../../config';
import { set } from 'react-native-reanimated';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function Profile() {
  
  const [isModify, setisModify] = useState(false);

  const updateState = () => {
    setisModify(!isModify);
  };

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    profilePic: "",
    username: "",
  });

  const getUserData = async() => {
    const id = "key1";

    firebase.database()
    .ref('/Accounts').orderByKey()
    .equalTo(id)
    .on('value', snapshot => {
      snapshot.forEach(childSnapshot=> {
        setUserData({
          email: childSnapshot.val().email,
          firstName: childSnapshot.val().firstName,
          profilePic: childSnapshot.val().profilePic,
          username: childSnapshot.val().username,
        });
      });
    });
  };
  
  useEffect(() => {
    getUserData()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <TextInput editable = {isModify? true : false}
        style = {styles.input} value = {userData.email} ></TextInput>
      <TextInput editable = {isModify? true : false} style = {styles.input}>{userData.firstName}</TextInput>
      <TextInput editable = {isModify? true : false} style = {styles.input}>{userData.username}</TextInput>

      <TouchableOpacity onPress = {updateState}>
        <Text>{isModify? "Click to Save" : "Click to Modify"}</Text>
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

  input: {
    borderColor: "blue", 
    borderWidth: 1,
    height: 40,
    padding: 5,
    backgroundColor: "pink",
    marginTop: 10,
    width: "90%",
  }
});

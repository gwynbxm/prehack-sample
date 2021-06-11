import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import firebase from 'react-native-firebase';

export default function Profile() {

  const [isModify, setisModify] = useState(false);

  const updateState = () => {
    setisModify(!isModify);
  }
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <TextInput editable = {isModify? true : false}
        underlineColorAndroid = "transparent"
        style = {styles.input}>Email</TextInput>
      <TextInput editable = {isModify? true : false} style = {styles.input}>First Name</TextInput>
      <TextInput editable = {isModify? true : false} style = {styles.input}>Username</TextInput>

      <Button onPress = {updateState} title = {isModify? "Click to Save" : "Click to Modify"}></Button>
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

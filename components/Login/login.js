import React, {useEffect, useState} from 'react';
import { Text, View ,TouchableOpacity, Image, TextInput} from 'react-native';
import firebase from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Register')
  }

  const onLoginPress = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (response) => {
      const uid = response.user.uid
      const userRef = firebase.database().ref("Accounts/" +  firebase.auth().currentUser.uid)
      userRef
      .on('value', snapshot => {
        console.log('User Data: ', snapshot.val());
     });
    }
    //navigation.navigate("Home")
    ) // END OF THEN
    // .then(
    //   console.log("Login user uid: " + firebase.auth().currentUser.uid)
    //  //navigation.navigate('Home')
    // ) //END OF 2ND END
  }

  return (
    <View style={styles.container}>
     <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/HackTestLogo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
    </View>
  );
}

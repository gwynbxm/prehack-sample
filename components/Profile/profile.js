import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "../../config.js";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    profilePic: "",
    username: "",
  });

  const [errorText, setErrorText] = useState("");
  const [image, setImage] = useState(null);

  const handleChangeText = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const updateUser = async () => {
    firebase
      .database()
      .ref("Accounts/" + "-MbuZgTDSHv8D-W65UBa")
      .update({
        firstName: userData.firstName,
        email: userData.email,
        username: userData.username,
      });
    alert("updated user details!");
  };

  const deleteUser = async () => {
    await firebase.database().ref("/Accounts/-MbvBl1kkDbGNl6IR8nC").set(null);
    alert("deleted user");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // uploadImage(result.uri)
      //   .then(() => {
      //     alert("image success");
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.dpContainer}>
          <ImageBackground
            style={styles.profileDp}
            imageStyle={{ borderRadius: 100 }}
            source={{
              uri: image
                ? image
                : userData
                ? userData.profileUrl ||
                  "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                : "https://lh3.googleusercontent.com/znytw2BkzEYJv20Xp-0f8TMaopbemaVWLiRirBZ217Hxuo5vgX-KAKZDLdY3VojsYWXvfm5ollyUiAvecuwdNqzJ",
            }}
          >
            <View style={styles.cameraContainer}>
              <Icon name="camera" size={35} style={styles.cameraIcon} />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="red" size={20} />
        <TextInput
          placeholder="First Name"
          style={styles.textInput}
          value={userData.firstName}
          onChangeText={(value) => handleChangeText("firstName", value)}
        ></TextInput>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user-o" color="red" size={20} />
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          value={userData.username}
          onChangeText={(value) => handleChangeText("username", value)}
        ></TextInput>
      </View>
      <View style={styles.action}>
        <Icon name="email-outline" size={24} color="red" />
        <TextInput
          placeholder="Email Address"
          style={styles.textInput}
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(value) => handleChangeText("email", value)}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.saveProfileBtn}
        onPress={() => updateUser()}
      >
        <Text style={styles.saveBtnTitle}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteProfileBtn}
        onPress={() => deleteUser()}
      >
        <Text style={styles.deleteBtnTitle}>DELETE</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  dpContainer: {
    height: 150,
    width: "100%",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDp: {
    height: 150,
    width: 150,
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    opacity: 0.7,
    alignItems: "center",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
  },

  saveProfileBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  saveBtnTitle: {
    color: "white",
  },
  deleteProfileBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  deleteBtnTitle: {
    color: "white",
  },
});

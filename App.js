import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Profile from './components/Profile/profile';
import Home from './components/Home/Home'; 
import Loading from './components/Loading/loading'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {createStackNavigator} from "@react-navigation/stack"

const HomeTab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function HomeTabs(){
  return(
    <HomeTab.Navigator initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Others") {
              iconName = "address-book";
              focused ? (color = "teal") : (color = "gray");
            } else if (route.name === "Home") {
              iconName = "home";
              focused ? (color = "teal") : (color = "gray");
            } else if (route.name === "Profile") {
              iconName = "user";
              focused ? (color = "teal") : (color = "gray");
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'teal',
          inactiveTintColor: 'gray',
        }}>
      <HomeTab.Screen name="Others" component={Profile} />
      <HomeTab.Screen name="Home" component={Home} />
      <HomeTab.Screen name="Profile" component={Profile} />
    </HomeTab.Navigator>
  );
}

export default function App() {

  //const [loading, setLoading] = useState(true)
  //const [user,setUser] = useState(null)
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <>
          <RootStack.Screen name="Loading" component={Loading}/>
          <RootStack.Screen name="Login" component={Login}/>
          <RootStack.Screen name="Register" component={Register}/>
          <RootStack.Screen name="Home" component={HomeTabs}/>
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

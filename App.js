import React from 'react';
import {StyleSheet, Text, View,TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RegisterScreen from './components/RegisterScreen';
import Vacancies from './components/Vacancies';

const AppStackNavgator = createStackNavigator({
  
  Login: LoginScreen,
  Register: RegisterScreen,
  Home: HomeScreen,
  Vacancies: Vacancies,
  


})

export default class App extends React.Component {

  render() {

    return (
      
      <View style={styles.container}>
      
      <AppStackNavgator/>

  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    
  },


});
import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast'

export default class LoginScreen extends Component {
  static navigationOptions = {

    title: 'RecruitmentSystem',
   
    
  }

  constructor(props) {
    super(props)
    this.state = {

      email: '',
      password: '',
      errorMessage: null
    }
  }
  componentWillMount() {
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyAf_8omnSbUOICJIAmuPTypK95Km9VZg08',
    //   authDomain: 'fir-practice-c885f.firebaseapp.com',
    // }

    // firebase.initializeApp(firebaseConfig);
    var config = {
      apiKey: "AIzaSyAf_8omnSbUOICJIAmuPTypK95Km9VZg08",
      authDomain: "fir-practice-c885f.firebaseapp.com",
      databaseURL: "https://fir-practice-c885f.firebaseio.com",
      projectId: "fir-practice-c885f",
      storageBucket: "fir-practice-c885f.appspot.com",
      messagingSenderId: "268622168409"
    };
    firebase.initializeApp(config);


  }

  userSignIn = () => {


    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //.then(() => this.props.navigation.navigate('Home'))
      //.then(() => this.refs.toast.show('Successfull Logined'))
      .then(this.moveToVacancies)
      .catch((error)=>{
        
        
         console.log('error ' , error),
         this.refs.toast.show('error')
    })
  }
  moveToVacancies = () => {

     this.refs.toast.show('Successfull Logined');
     this.props.navigation.navigate('Vacancies')

  }
  render() {
    return (


      <View style={styles.container}>
        <Text style={styles.text}> Login Screeen </Text>

        <TextInput style={styles.textInput} placeholder="email" onChangeText={email => this.setState({ email })}

        />
        <TextInput style={styles.textInput} placeholder="password" onChangeText={password => this.setState({ password })}
          secureTextEntry={true}

        />
       


        <TouchableOpacity
          style={styles.button}
          onPress={this.userSignIn}
        >
          <Text> Sign In </Text>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text> New User? Register Here </Text>
        </TouchableOpacity>

        <Toast ref="toast" />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom:20,
    alignItems: 'center',
    backgroundColor: '#9E9E9E',
    padding: 10
  },
  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20


  },


  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#6a1b9a',
    paddingLeft: 40,
    paddingRight: 40,

  },

  textInput: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#9E9E9E'


  }



});
import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from 'react-native-simple-radio-button';

var userType = [
    { label: "Admin", value: 0 },
    { label: "Student", value: 1 },
    { label: "Company", value: 2 },
];

export default class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'RecruitmentSystem',
    }



    constructor(props) {
        super(props)
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            
            email: '',
            password: '',
            errorMessage: null,
            userType:''
        }
    }


    userRegister = () => {

        


        const { email, password } = this.state
        const {userValue} = this.state

        if (userValue!=null){

        firebase.auth().createUserWithEmailAndPassword(email, password)
            //.then(() => this.refs.toast.show('Successfully Registered'))
            .then(this.updateDatabase)
            .catch((error) => {
                
                console.log('error in Creating User ', error);
                this.refs.toast.show('error in Creating User');
                
            })
        }else{
            this.refs.toast.show('Select UserType');
        }

    }
    updateDatabase = () => {
        const {userValue} = this.state

        if (userValue == 0){
            this.state.userType='Admin'
            console.log(this.state.userType)
        }else if (userValue==1){
            this.state.userType='Student'
            console.log(this.state.userType)
        }else if (userValue==2){
            this.state.userType='Company'
            console.log(this.state.userType)
        }

    
        
        this.refs.toast.show('Successfully Registered')
        console.log("in update database");
        const { email, password,userType } = this.state
        firebase.database().ref('User/').push({
            email: email,
            password: password,
            userType: userType

        }).then(() => { console.log("Data Inserted") })
            .catch((error) => {

                console.log('error in Updating', error)
            })


    }

    render() {
        return (


            <View style={styles.container}>
                <Text style={styles.text}> Register Screen </Text>
                <RadioForm

                    radioStyle={
                         {paddingRight: 5}
                        
                    }
                    initial={null}
                    
                    
                    
                    formHorizontal={true}

                    buttonColor={'#fff'}
                    

                    


                    radio_props={userType}
                    //onPress={(value) => { this.refs.toast.show(value.toString()) }}
                    onPress={userValue=>this.setState({userValue}) }
                    selectedButtonColor={'#9E9E9E'}


                />
               <Text style={styles.lineBreak}>{"\n"}</Text>



                <TextInput style={styles.textInput} placeholder="email" onChangeText={email => this.setState({ email })}

                />
                <TextInput style={styles.textInput} placeholder="password" onChangeText={password => this.setState({ password })}
                    secureTextEntry={true}

                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={this.userRegister}
                >
                    <Text> Register </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text>Already Member? Login Here </Text>
                </TouchableOpacity>



                <Toast ref="toast" />


            </View>
        );
    }
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6a1b9a',
        paddingLeft: 40,
        paddingRight: 40
    },
    lineBreak:{
        fontSize:5
    },
    text: {
        justifyContent: 'center',
        color: 'white',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20


    },
    button: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#9E9E9E',
        padding: 10
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#9E9E9E'


    },



});
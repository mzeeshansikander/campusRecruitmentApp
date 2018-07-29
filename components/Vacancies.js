import React, { Component } from 'react';
import {ToolbarAndroid, TouchableHighlight, ListView,TouchableOpacity,TextInput, StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';


export default class Vacancies extends Component {

    static navigationOptions={
        title: 'RecruitmentSystem',
    }   
    constructor(){
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
            ];  
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2});
        this.state = { 

            itemDataSource: ds
        }

        this.itemsRef = this.getRef().child('Vacancies');
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }
    
   getRef(){
       return firebase.database().ref();
   }
    
    componentWillMount(){

        this.getItems(this.itemsRef);
    }
    componentDidMount(){

        this.getItems(this.itemsRef);
    }
      getItems(itemsRef){
          //Static List
          //let items = [{title:'Item One'},{title: 'Item two'}];
          
          
          itemsRef.on('value',(snap)=>{
              
              let items = [];
              snap.forEach((child)=>{
                  
                  items.push({
                  title: child.val().jobTitle,
                  companyName: child.val().companyName,
                  _key: child.key
              });
          });
          this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)


        });

        });
        

      }

      pressRow(item){
          console.log(item.companyName);
      }
      renderRow(item){
          return(
              <TouchableHighlight onPress={()=>this.pressRow(item)}>

              <View style={styles.li}>
              <Text style={styles.liText}>{item.title} In {item.companyName} </Text>

              </View>


            </TouchableHighlight>


          );


      }
    
    render() {
       var standardDataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 != r2})
        return (


            <View style={styles.container}>
            <Text style={styles.text}> Vacancies List </Text>

           {/* <ToolbarAndroid title='ItemLister'/> */}
            <ListView
            dataSource={this.state.itemDataSource}
            renderRow= {this.renderRow}
            />
        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        marginTop:10,
        justifyContent: 'center',
        color: 'white',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20


    },

    li:{
        borderWidth:1,        
        borderColor: 'transparent'

    },
    liText:{
        color:'white',
        fontSize: 20,


    },
   

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6a1b9a',
        paddingLeft: 10,
        paddingRight: 10
    }
  
});
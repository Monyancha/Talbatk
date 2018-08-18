import React, { Component } from 'react';
import { StyleSheet, Text } from "react-native";

import  LinearGradient  from 'react-native-linear-gradient';



export default class SingleCategory extends Component {

  render() {
    var styles = StyleSheet.create({
    	text:{
        textAlign:'center',
        backgroundColor:'transparent',
        color:'white',
        fontFamily:'Droid Arabic Kufi',
        fontSize:16
      },
      box:{
        width:'90%',
        alignSelf:'center',
        height:40,
        marginTop:15,
        borderRadius:4,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',

      },

    });
    return (
      <LinearGradient
              colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
            style={[styles.box,this.props.style]}>

      <Text style={styles.text}>{this.props.name}</Text>
  </LinearGradient>

);

  }






}

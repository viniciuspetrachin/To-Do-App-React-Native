import React, { Component } from 'react';

import { View, TextInput, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

export default class components extends Component {
  render() {
    return (
       <View style={[styles.container, this.props.style]}>
          <Icon name={this.props.icon} size={20} style={styles.icon}/>
          <TextInput {...this.props} style={styles.input}/>
       </View>
    )
  }
}
const styles = StyleSheet.create({
   container:{
      width: '100%',
      height: 40,
      backgroundColor: '#EEE',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center'
   },
   icon:{
      color: '#333',
      marginLeft: 20
   },
   input:{
      marginLeft: 20,
      width: '70%'
   }
})

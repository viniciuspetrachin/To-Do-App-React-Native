import React, { Component } from 'react'

import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import commonStyles from '../commonStyles'



export default class screens extends Component {
  render() {

    return (
      <Modal 
      transparent={true} 
      visible={this.props.isVisible}
      onRequestClose={this.props.onCancel}
      animationType='slide'
      >
         <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.background} />
         </TouchableWithoutFeedback>
         <View style={styles.container}>
            <Text style={styles.header}>
               Nova tarefa
            </Text>
         </View>
         <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.background} />
         </TouchableWithoutFeedback>
      </Modal>
   )
  }
}
const styles = StyleSheet.create({
   container:{
      flex: 1,
      backgroundColor: '#FFF'
   },
   background:{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
   },
   header:{
      fontFamily: commonStyles.fontFamily,
      backgroundColor: commonStyles.colors.today,
      color: commonStyles.colors.secondary,
      textAlign: 'center',
      padding: 15,
      fontSize: 18
   }
})
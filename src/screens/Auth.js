import React, { Component } from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyle from '../commonStyles'

// import { Container } from './styles';

export default class screens extends Component {
  render() {
    return (
       <ImageBackground style={styles.background} source={backgroundImg}>
          <Text style={styles.title}>Tasks</Text>
       </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
   background: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   },
   title:{
      fontFamily: commonStyle.fontFamily,
      color: commonStyle.colors.secondary,
      fontSize: 70,
      marginBottom: 10
   }
})

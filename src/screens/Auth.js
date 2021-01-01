import React, { Component } from 'react'
import { 
   View, 
   ImageBackground, 
   Text, StyleSheet, 
   TextInput,
   TouchableOpacity
} from 'react-native'
import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyle from '../commonStyles'

// import { Container } from './styles';

export default class screens extends Component {

   state = {
      email: '',
      password: ''
   }

  render() {
    return (
       <ImageBackground style={styles.background} source={backgroundImg}>
          <Text style={styles.title}>Tasks</Text>
          <View style={styles.form}>
            <TextInput 
               placeholder="E-mail"
               value={this.state.email}
               onChangeText={email => this.setState({email})}
               style={styles.input}
            />
            <TextInput 
               placeholder="Senha"
               value={this.state.password}
               onChangeText={password => this.setState({password})}
               style={styles.input}
            />
          </View>
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
   },
   input:{

   },
   form:{
      backgroundColor: '#FFF',
      padding: 20,
   }

})

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      stageNew: false,
   }

  render() {
    return (
       <ImageBackground style={styles.background} source={backgroundImg}>
          <Text style={styles.title}>Tasks</Text>
          <View style={styles.form}>
             {
                this.state.stageNew && 
                  <TextInput 
                     placeholder="Nome"
                     value={this.state.name}
                     onChangeText={name => this.setState({name})}
                     style={styles.input}
                  />
             }
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
               secureTextEntry={true}
            />
            { 
               this.state.stageNew &&
               <TextInput 
               placeholder="Confirme a senha"
               value={this.state.confirmPassword}
               onChangeText={confirmPassword => this.setState({confirmPassword})}
               style={styles.input}
               secureTextEntry={true}
            />
            }
            <TouchableOpacity>
               <View style={styles.button}>
                  <Text style={styles.buttonText}>
                     {this.state.stageNew ? 'Registrar' : 'Entrar'}
                  </Text>
               </View>
            </TouchableOpacity>
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
      backgroundColor: '#FFF',
      marginTop: 10,
   },
   form:{
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 20,
      width: '90%',

   },
   button:{
      backgroundColor: '#080',
      marginTop: 10,
      padding: 10,
      alignItems: 'center'
   },
   buttonText:{
      fontFamily: commonStyle.fontFamily,
      color: '#FFF',
      fontSize: 20,
   }

})

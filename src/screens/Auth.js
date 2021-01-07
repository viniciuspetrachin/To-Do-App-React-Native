import React, { Component } from 'react'
import {
   View,
   ImageBackground,
   Text, StyleSheet,
   TouchableOpacity,
} from 'react-native'

import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyle from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { showError, showSuccess } from '../common'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const usersCollection = firestore().collection('users')


const initialState = {
   name: Math.floor(Math.random() * 1000) + ' Nome',
   email: Math.floor(Math.random() * 10000) + '@gmail.com',
   password: '123123',
   confirmPassword: '123123',
   stageNew: false,
}
export default class screens extends Component {
   constructor() {
      super()

      this.state = {
         ...initialState
      }


   }
   createUser = async user => {
      await usersCollection.doc(user.uid).get()
      .then((docSnapshot) => {
         if(docSnapshot.exists)
            return this.props.navigation.navigate('Home')
      })
      await usersCollection
         .doc(user.uid)
         .set({
            uid: user.uid,
            email: user.email,
            name: this.state.name,
            tasks:{
            }
         })
         .then(() => {
            return this.props.navigation.navigate('Home')
         });
   }

   componentDidMount = async () => {

   }

   signinOrSignup = () => {
      if (this.state.stageNew) {
         this.signup()
      } else {
         this.signin()
      }
   }


   signup = () => {
      auth()
         .createUserWithEmailAndPassword(this.state.email, this.state.password)
         .then((response) => {
            this.createUser(response.user)
            showSuccess(`Bem-vindo ${this.state.name}`)
         })
         .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
               showError('E-mail em uso');
            }
            if (error.code === 'auth/invalid-email') {
               showError('E-mail inválido');
            }
            showError('Um erro desconhecido ocorreu.')
         });
   }
   signin = () => {
      auth()
         .signInWithEmailAndPassword(this.state.email, this.state.password)
         .then((response) => {
            this.createUser(response.user)
            showSuccess('Logado com sucesso!')
         })
         .catch(error => {
            showError(error);
         });
   }

   render() {
      return (
         <ImageBackground style={styles.background} source={backgroundImg}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.form}>
               <Text style={styles.subtitle}>
                  {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
               </Text>
               {
                  this.state.stageNew &&
                  <AuthInput
                     placeholder="Nome"
                     icon="user"
                     value={this.state.name}
                     onChangeText={name => this.setState({ name })}
                     style={styles.input}
                  />
               }
               <AuthInput
                  placeholder="E-mail"
                  icon="at"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  style={styles.input}
               />
               <AuthInput
                  placeholder="Senha"
                  icon="lock"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                  secureTextEntry={true}
               />
               {
                  this.state.stageNew &&
                  <AuthInput
                     placeholder="Confirme a senha"
                     icon="asterisk"
                     value={this.state.confirmPassword}
                     onChangeText={confirmPassword => this.setState({ confirmPassword })}
                     style={styles.input}
                     secureTextEntry={true}
                  />
               }
               <TouchableOpacity onPress={this.signinOrSignup}>
                  <View style={styles.button}>
                     <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Registrar' : 'Entrar'}
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity style={{ padding: 10, alignItems: 'center' }}
                  onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                  <Text style={styles.buttonText}>
                     {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                  </Text>
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
   title: {
      fontFamily: commonStyle.fontFamily,
      color: commonStyle.colors.secondary,
      fontSize: 70,
      marginBottom: 10
   },
   input: {
      backgroundColor: '#FFF',
      marginTop: 10,
   },
   form: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 20,
      width: '90%',

   },
   button: {
      backgroundColor: '#080',
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
      borderRadius: 10
   },
   buttonText: {
      fontFamily: commonStyle.fontFamily,
      color: '#FFF',
      fontSize: 20,
   },
   subtitle: {
      fontFamily: commonStyle.fontFamily,
      color: '#FFF',
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10,
   }

})

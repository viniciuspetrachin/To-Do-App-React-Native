import React, {
   Component,
   useEffect
} from 'react';

import {
   ActivityIndicator,
   StyleSheet,
   View
} from 'react-native';
import { showError } from '../common';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const usersCollection = firestore().collection('Users')

export default class screens extends Component {

   createUser = async id => {
      await usersCollection
         .doc(id)
         .set({
            id: id,
            name: "Teste Senor",
         })
         .then(() => {
            this.props.navigation.navigate('Home')
         });
   }

   componentDidMount = () => {
      try {
         auth().onAuthStateChanged(user => {
            if (user) {
              this.createUser(user.uid)
            } else {
               this.props.navigation.navigate('Auth')
            }
         })
      } catch (err) {
         this.props.navigation.navigate('Auth')
      }

   }



   render() {
      return (
         <View style={styles.container}>
            <ActivityIndicator size='large' color='#FFF' />
         </View>
      )
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center'
   }
})
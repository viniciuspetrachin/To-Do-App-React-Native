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

const usersCollection = firestore().collection('users')

export default class screens extends Component {



   componentDidMount = () => {
      try {
         auth().onAuthStateChanged(user => {
               this.props.navigation.navigate('Auth')
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
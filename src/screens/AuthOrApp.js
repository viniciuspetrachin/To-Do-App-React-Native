import React, {
   Component,
   useEffect
} from 'react';

import {
   ActivityIndicator,
   StyleSheet,
   View
} from 'react-native';
import { showError} from '../common';

import auth from '@react-native-firebase/auth'


export default class screens extends Component {

   state = {
      initializing : true,
      user : null,
   }

   componentDidMount = () => {
      try {
         auth().onAuthStateChanged(user  => {
            if (user) {
               this.props.navigation.navigate('Home', user)
            } else {
               this.props.navigation.navigate('Auth')
            }
         })
      } catch (err) {
         showError('Não foi possível logar na aplicação')
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
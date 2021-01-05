import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from '../firebase/config'
import { showError } from '../common'

export default props => {
   const email = props.navigation.getParam('email')
   const options = {
      email,
      secure: true
   }

   const logout = async () => {
      try{
         await firebase.auth().signOut().then(() => {
            props.navigation.navigate('AuthOrApp')
         }).catch(err =>{
            showError(err)
         })
      } catch(err) {
         showError('Não foi possível deslogar!')
      }
      
   }
   return (
      <ScrollView>
         <View style={styles.header}>
            <Gravatar style={styles.avatar} options={options} />
            <View style={styles.userInfo}>
               <Text style={styles.email}>{email}</Text>
            </View>
            <TouchableOpacity onPress={logout}>
               <View style={styles.logoutIcon}>
                  <Icon name='sign-out' size={30} color='#800'/>
               </View>
         </TouchableOpacity>
         </View>
        
         <DrawerItems {...props} />
      </ScrollView>
   )
}
const styles = StyleSheet.create({
   header: {
      borderBottomWidth: 1,
      borderColor: '#DDD'
   },
   title: {
      color: '#000',
      fontFamily: commonStyles.fontFamily,
      fontSize: 50,
      paddingTop: 30,
      padding: 10
   },
   avatar: {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 3,
      margin: 10
   },
   userInfo: {
      marginLeft: 10,
   },
   email: {
      fontFamily: commonStyles.fontFamily,
      fontSize: 20,
      marginBottom: 10,
      color: '#000'
   },
   logoutIcon:{
      marginLeft: 10,
      marginBottom: 10,
   }
})
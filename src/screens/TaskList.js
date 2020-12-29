import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import todayImage from '../../assets/imgs/today.jpg'
import commomStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import Task from '../components/Task'

export default class screens extends Component {
  render() {

   const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return(
       <View style={styles.container}>
          <ImageBackground style={styles.background} source={todayImage}>
             <View style={styles.titleBar}>
               <Text style={styles.title}>Hoje</Text>
               <Text style={styles.subtitle}>{today}</Text>
             </View>
          </ImageBackground>
          <View style={styles.task}>
            <Task desc="Dar beijinhos no mor" estimateAt={new Date()} doneAt={new Date()} />
            <Task desc="Fazer carinho na Jojo" estimateAt={new Date()} doneAt={new Date()} />
            <Task desc="Dar cheirinhos na jojo" estimateAt={new Date()} doneAt={null} />
            <Task desc="Mandar a kessie pegar calango" estimateAt={new Date()} doneAt={new Date()} />
            <Task desc="Assistir Mr Robots" estimateAt={new Date()} doneAt={null}/>
          </View>
       </View>
    )
  }
}
const styles = StyleSheet.create({
   container:{
      flex: 1
   },
   background:{
      flex: 3
   },
   task:{
      flex: 7
   },
   titleBar:{
      flex: 1,
      justifyContent: 'flex-end',
   },
   title:{
      fontFamily: commomStyles.fontFamily,
      color: commonStyles.colors.secondary,
      fontSize: 50,
      marginLeft: 20,
      marginBottom: 20
   },
   subtitle
   :{
      fontFamily: commomStyles.fontFamily,
      color: commonStyles.colors.secondary,
      fontSize: 25,
      marginLeft: 20,
      marginBottom: 30
   }
})
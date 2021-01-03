import React, { Component } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         ImageBackground, 
         FlatList,
         TouchableOpacity,
         Platform,
         Alert
      } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import commomStyles from '../commonStyles'
import commonStyles from '../commonStyles';
import Task from '../components/Task'
import AddTask from './AddTask'

const initialState ={
   showAddTask: false,
   showDoneTasks: true,
   visibleTasks:[],
   tasks:[]
}

export default class screens extends Component {

   state = {
      ...initialState
   }

   componentDidMount =  async () => {
      const stateString = await AsyncStorage.getItem('tasksState')
      const savedState = JSON.parse(stateString) || initialState
      this.setState({showDoneTasks: savedState.showDoneTasks}, this.filterTasks)
   }
   
   filterTasks = () => {
      let visibleTasks = null
      if(this.state.showDoneTasks){
         visibleTasks=[...this.state.tasks]
      } else {
         const pending = task => task.doneAt === null
         visibleTasks = this.state.tasks.filter(pending)
      }

      this.setState({visibleTasks})

      AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks: this.showDoneTasks}))
   }

   toggleFilter = () => {
      this.setState({showDoneTasks : !this.state.showDoneTasks}, this.filterTasks)
   }

   toggleTask = taskId => {
      const tasks = [...this.state.tasks]
      tasks.forEach(task => {
         if(task.id === taskId){
            task.doneAt = task.doneAt ? null : new Date()
         }
      })

      this.setState({tasks}, this.filterTasks)
   }

   addTask = newTask => {
      if(!newTask.desc || !newTask.desc.trim()){
         Alert.alert('Dados Inválidos','Descrição não informada!')
         return
      }
      const tasks = [...this.state.tasks]
      tasks.push({
         id: Math.random(),
         desc: newTask.desc,
         estimateAt: newTask.date,
         doneAt: null
      })
      this.setState({tasks, showAddTask: false}, this.filterTasks)
   }

   deleteTask = id => {
      const tasks = this.state.tasks.filter(task => task.id !== id)
      this.setState({tasks}, this.filterTasks)
   }

   getImage = () => {
      switch(this.props.daysAhead) {
         case 0: return todayImage
         case 1: return tomorrowImage
         case 7: return weekImage
         case 30: return monthImage
      }
   }
   getColor = () => {
      switch(this.props.daysAhead) {
         case 0: return commonStyles.colors.today
         case 1: return commonStyles.colors.tomorrow
         case 7: return commonStyles.colors.week
         case 30: return commonStyles.colors.month
      }
   }

  render() {
   const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return(
       <View style={styles.container}>

          <AddTask 
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask : false})}
          onSave={this.addTask}
          />

          <ImageBackground style={styles.background} source={this.getImage()}>
             <View style={styles.iconBar}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name='bars' size={20} color={commomStyles.colors.secondary}/>
                </TouchableOpacity>
               <TouchableOpacity onPress={this.toggleFilter}>
                  <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                  size={20} 
                  color={commomStyles.colors.secondary}/>
               </TouchableOpacity>
             </View>
             <View style={styles.titleBar}>
               <Text style={styles.title}>{this.props.title}</Text>
               <Text style={styles.subtitle}>{today}</Text>
             </View>
          </ImageBackground>
          <View style={styles.task}>
            <FlatList 
               data={this.state.visibleTasks}
               keyExtractor={item => `${item.id}`}
               renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>}
            />
          </View>
          <TouchableOpacity
            style={[styles.addButton, {backgroundColor: this.getColor()}]}
            onPress={() => this.setState({ showAddTask: true})}
            >
             <Icon name='plus' size={20}
                  color={commonStyles.colors.secondary} />
          </TouchableOpacity>
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
   },
   iconBar:{
      flexDirection: 'row',
      marginHorizontal: 20,
      justifyContent: 'space-between',
      marginTop: Platform.OS === 'ios' ? 30 : 10
   },
   addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
   }
})
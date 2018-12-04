import React from 'react';
import { Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './Style';

export class Habit extends React.Component{
   render(){
      return(
         <TouchableOpacity 
            style={styles.habitButton} 
            onPress = {() => this.props.onHabitClick()}
         >
            <Text>{this.props.name}</Text>
         </TouchableOpacity>
      );
   }
}

export class HabitFrame extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         habits: null,
         errorLog: 'no errors'
      }

      this.loadHabits();
   }

   async loadHabits(){
      try{
         let keys = await AsyncStorage.getAllKeys();
         let something = await AsyncStorage.multiGet(keys);
         
         let habitData = something
            .map((ele, i)=>{
               let value = ele[1];
               let item = JSON.parse(value);
               return item
            })
            .sort((a,b) => (
               a.index > b.index
            ));

         // let item = await AsyncStorage.getItem('habit0');
         // let habitData = JSON.parse(item);
         this.setState({
            habits: habitData
         });
      }
      catch(error){
         this.setState({
            errorLog: error,
         })
      }    
      return; 
   }

   saveData(habit){
      const habitKey = 'habit' + habit.index;
      AsyncStorage.setItem(habitKey, JSON.stringify(habit));
      this.loadHabits();
   }

   handleEditHabitClick(selectedHabit) {
      this.props.navigation.navigate('ManageHabit', {'habit': selectedHabit,'saveData':(i)=>this.saveData(i)});
   }

   handleCreateHabitClick() {
      let newHabit = {
         index: this.state.habits.length,
         name: null,
         period: 0,
         dailyRepCount: 1,
      }
      this.props.navigation.navigate('ManageHabit', {'habit': newHabit, 'saveData':(i)=>this.saveData(i)});
   }


   render(){

      //this.props.navigation.getParam('habit', null)
      var a = 1;
      return (
         <View style={styles.container}>
            <View style={styles.addHabitButtonContainer}>
               <TouchableOpacity
                  style={styles.addHabitButton}
                  onPress = {() => this.handleCreateHabitClick()}
               >
                  <Text>+</Text>
               </TouchableOpacity> 
            </View> 
            <View>
               <FlatList
                  data = {this.state.habits}
                  keyExtractor = {(item, index) => item.index}
                  renderItem = {({item})=>
                     <Habit
                        name = {item.index + ' ' + item.name + ' ' + item.period}
                        index = {item.index}
                        onHabitClick = {()=>this.handleEditHabitClick(item)}
                     />
                  }
               />
            </View>
         </View>
      );
   }
}





// async saveKey() {
//    let habbit1_object = {
//       index: 0,
//       name: 'Rob',
//    }

//    await AsyncStorage.setItem('habbit1', JSON.stringify(habbit1_object));
// }

// async getKey() {
//    try {
//       const value = await AsyncStorage.getItem('habbit1');
//       const item = JSON.parse(value);
//       return item;
//     } 
//     catch (error) {
//       console.log("Error retrieving data" + error);
//     }
//    return;
// }
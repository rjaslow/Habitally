import React from 'react';
import { Text, View, TouchableOpacity, FlatList,Picker, AsyncStorage } from 'react-native';
import styles from './Style';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements'; 


//ToDo: Write Daily View, Weekly View

export class ManageHabitScreen extends React.Component{

   constructor(props){
      super(props);
      this.state = {
         dailyRepCount: '1',
         habit: this.props.navigation.getParam('habit', null),
         saveData: this.props.navigation.getParam('saveData', null),
      } 
   }

   handlePeriodSelection(periodIndex) {
      let oldHabit = {...this.state.habit};
      oldHabit.period = periodIndex;
      this.setState({
         habit: oldHabit
      })
   }

   handleChangeText_HabitDesc(habitDesc){
      let oldHabit = {...this.state.habit};
      oldHabit.name = habitDesc;
      this.setState({
         habit: oldHabit
      })
   }

   handleSelection_DailyRepetition(dailyRepCount){
      let oldHabit = {...this.state.habit};
      oldHabit.dailyRepCount = dailyRepCount;
      this.setState({
         habit: oldHabit
      })
   }

   handleClick_Save(){
      this.state.saveData(this.state.habit);
      this.props.navigation.navigate('Home');
   }

   render(){

      const viewType = (this.state.periodIndex ==0 ? 
         <DailyView
            selectedRepCount = {this.state.dailyRepCount}
            onValueChange = {(itemValue) => this.handleSelection_DailyRepetition(itemValue)}
         /> : 
         <WeeklyView
         />
      );
      
      return(
         <View>
            <HabitNameView
               onChangeText = {(text)=>this.handleChangeText_HabitDesc(text)}
               habitDesc = {this.state.habit.name}
            />
             <Text>habit:</Text>
             <Text>index: {this.state.habit.index}</Text>
             <Text>name: {this.state.habit.name}</Text>
             <Text>period: {this.state.habit.period}</Text>
             <Text>dailyRepCount: {this.state.habit.dailyRepCount}</Text>
             <TouchableOpacity
                  style={styles.addHabitButton}
                  onPress = {() => this.handleClick_Save()}
               >
                  <Text>Save</Text>
               </TouchableOpacity> 
            <PeriodButtonGroup  
               onPressEvent = {(selectedIndex) => this.handlePeriodSelection(selectedIndex)}
               periodIndex = {this.state.periodIndex}
            />
            {viewType}
         </View>
      );
   }
}

export class HabitNameView extends React.Component{
   render(){
      return (
         <View>
            <View>
               <FormLabel>Habit Description</FormLabel>
               <FormInput 
                  onChangeText={(text) => this.props.onChangeText(text)}
                  value = {this.props.habitDesc}
               />
               <FormValidationMessage>Error Message</FormValidationMessage>
            </View>
            <View>
               <Text>here: {this.props.habitDesc}</Text>
            </View>
         </View>
      );
   }
}

export class DailyView extends React.Component{
   render(){

      const dailyRepetitionNums = [...['1','2', '3', '4', '5']].map(function(ele, i){
         return (
            <Picker.Item key={i} label={ele} value={ele} />
         );
      });
      return (
         <View>
            <Text>Select the # of Daily Repetitions</Text>
            <Picker
               selectedValue={this.props.selectedRepCount}
               style={{ height: 50, width: 100 }}
               onValueChange = {(itemValue,itemIndex) => this.props.onValueChange(itemValue)}
            >
               {dailyRepetitionNums}
            </Picker>
         </View>
      );
   }s
}

export class WeeklyView extends React.Component{
   render(){
      return (
         <View>
            <Text>Weekly</Text>
         </View>
      );
   }
}


function PeriodButtonGroup(props){
   const compDayBtn = () => <Text>Daily</Text>;
   const compWeekBtn = () => <Text>Weekly</Text>;
   const buttons = [{ element: compDayBtn }, { element: compWeekBtn }];
   const selectedIndex = props.periodIndex;
   return(
         <ButtonGroup
            onPress= {(selectedIndex) => props.onPressEvent(selectedIndex)}
            selectedIndex = {selectedIndex}
            buttons = {buttons}
         />
   );
}

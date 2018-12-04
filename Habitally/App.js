import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import { HabitFrame} from './src/Index';
import { ManageHabitScreen } from './src/ManageHabit';

 const RootStack = createStackNavigator(
   {
     Home: HabitFrame,
     ManageHabit: ManageHabitScreen,
   },
   {
     initialRouteName: 'Home',
   }
 );


export default class App extends React.Component {
  
 loadHabitsFresh(){

   AsyncStorage.clear();

   const habitData = [
      {
         index: 0,
         name: 'Rob',
         period: 0,
         dailyRepCount: 1,
      },
      {
         index: 1,
         name: 'Tori',
         period: 1,
         dailyRepCount: 4,
      },
      {
         index: 2,
         name: 'hey',
         period: 0,
         dailyRepCount: 0,
      },
   ];

   habitData.map((ele, i) => {
      const habitKey = 'habit' + ele.index;
      AsyncStorage.setItem(habitKey, JSON.stringify(ele));
   });

   //AsyncStorage.setItem('habit0', JSON.stringify(habitData));
}
  
   render() {
      this.loadHabitsFresh();
      return <RootStack/>;
  }
}


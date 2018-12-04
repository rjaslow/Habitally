import {StyleSheet,Text,View } from 'react-native';

export default StyleSheet.create({
      mainContainer: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
         borderWidth: 1 ,
         borderColor: 'black',
      },

      container: {
         marginTop: '10%',
      },

      habitButton: {
         alignItems: 'center',
         backgroundColor: '#DDDDDD',
         borderWidth: 1 ,
         borderColor: 'black',
         marginTop: 10,
         paddingHorizontal : '40%',
         paddingVertical : 5,
         
      },

      addHabitButtonContainer: {
         alignItems: 'flex-end',
         backgroundColor: 'skyblue',
         borderWidth: 1 ,
         borderColor: 'black',
         justifyContent: 'center',
         paddingHorizontal : 10,
         paddingVertical : 10,
      },

      addHabitButton: {
         backgroundColor: '#DDDDDD',
         borderWidth: 1 ,
         borderColor: 'black',
         paddingHorizontal : 10,
         paddingVertical : 10,
      },
});
   
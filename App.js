import React, { useState, Component } from 'react';
import fs from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

//import boardInput from './Tents';
//import index.js from './'
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Component } from 'react-native';
//import RadioGroup from 'react-native-custom-radio-group';
//import {radioGroupList} from './components/radioGroupList.js';
//import RadioGroup from 'react-native-radio-buttons-group';
//import solver from '../my-new-project/node_modules/javascript-lp-solver/src/solver.js';
//import solver from 'javascript-lp-solver'

// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

//import screen_design from './screen_design'
//import game_settings from './game_settings';


import ScreenManager from "./screens/screen_manager" 
export default ScreenManager;


// import main_screen from "./screens/main_screen";

// const App = createSwitchNavigator({
//   Main: {
//     screen: screen_design,
//   },
//   Game: {
//     screen: game_settings,
//   },
//   App: {
//     screen: main_screen,
//   },
// });



// let radio_props_index = 0;

// var radio_props = [[
//   {label: 'low', value: 0 },
//   {label: 'medium', value: 0 },
//   {label: 'high', value: 1 },
// ],

// [{label: 'small', value: 0 },
//   {label: 'medium', value: 0 },
//   {label: 'big', value: 1 },
// ]];



  // class play_Button/* extends Component*/ {
  //   txt;
  //   texts(e) {
  //     txt = e;
  //   }

  //   handlePress(e) {
  //     if (this.props.onPress) {
  //         this.props.onPress(e);
  //     }
  //   }
  //   render() {
  //     return (
  //         <TouchableOpacity
  //             onPress={ this.handlePress.bind(this) }
  //             style={styles.buttonStyle}
  //             /*style={ this.props.style }*/ >
  //             <Text >txt</Text>
  //         </TouchableOpacity>
  //     );
  //   }
  // }

  
 // export default Button;

// export default function App() {
// const [PlayerName , MapSize, TreeDensity] = useState('');
  
//  /* model = {
//     "optimize": "capacity",
//     "opType": "max",
//     "constraints": {
//         "plane": {"max": 44},
//         "person": {"max": 512},
//         "cost": {"max": 300000}
//     },
//     "variables": {
//         "brit": {
//             "capacity": 20000,
//             "plane": 1,
//             "person": 8,
//             "cost": 5000
//         },
//         "yank": {
//             "capacity": 30000,
//             "plane": 1,
//             "person": 16,
//             "cost": 9000
//         }
//     },
// };*/

// //results = solver.Solve(model);
// //console.log(results);
// function PlayName_handler (enteredName) {
//   PlayerName : enteredName;
// };

// function MapSize_handler (enteredSize)  {
//   MapSize: enteredSize;
// };

// function TreeDensity_handler (enteredDensity) {
//   TreeDensity: enteredDensity;
// };

// // const GameGeneration_handler = () => {
// //   cancelAnimationFrame();
// // };

// function GameGeneration_handler () {

// };


// class RadioButton_size extends React.Component {
//   /*getInitialState = () => {
//     return {
//       value: 0,
//     }
//   }*/

//   render= () => {
//     return (
//       <View style= {{justifyContent: 'center'}}>
//         <RadioForm
//           //radio_props_index  = {0}
//           radio_props={radio_props[0]}
//           initial={0}
//           formHorizontal={true}
//           labelHorizontal={false}
//           buttonColor={'#50C900'}
//           selectedButtonColor= {'green'}
//           backgroundColor = {'green'}
//           animation={true}
          
//           onPress={(value) => {TreeDensity_handler({value:value,})}
//         }
//         />
//       </View>
//     );
//   }
// };

// class RadioButton_density extends React.Component {
//   //var RadioButtonProject = React.createClass({
    

//     /*getInitialState = () => {
//       return {
//         value: 0,
//       }
//     }*/

//     changeText(value) {
//  //if(value == "transport_bus") {
//        this.setState({
//             selectedButtonColor: '#50C900',
//              activeBgColor: '#50C900',
//             activeTxtColor: "white",
//              inActiveBgColor: "white",
//              inActiveTxtColor: "black",
//        });
//   //}
// }

//     render= () => {
//       return (
//         <View style= {{justifyContent: 'center'}}>
  
//           <RadioForm
//             radio_props_index  = {0}
//             radio_props={radio_props[1]}
//             initial={0}
//             formHorizontal={true}
//             labelHorizontal={false}
//             buttonColor={'#50C900'}
//             selectedButtonColor= {'green'}
//             backgroundColor = {'green'}
//             animation={true}
//             //onChange={(value) => {this.changeStyle(value);}}
//             //onChange={text => PlayName_handler(text)}
//             onPress={(value) => {MapSize_handler({value:value,})}}
//           />
//         </View>
//       );
//     }
//   };






//   return (
    
//     <View>
//       <ImageBackground source={require('/home/eitan/Downloads/my-new-project/001.jpg')} style={{width: '100%', height: '100%'}}>    
       
//       <View style={{padding: 50}}>
//         <View style={styles.container} >
//           <Text style={{fontSize:20, color: 'green'}}> Welcome to Tents!</Text>
//         </View>
//       </View>

//       <View style={{padding: 20}}>
      
//         <View style={{flex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
//             {/* <Text style= {{paddingRight : 150,justifyContent: 'center',}}>Your name:</Text> */}
        
//             {/* <TextInput
//               maxLength={50}
//               placeholder = "John Doe"
//               placeholderTextColor= '#464b52'
//               //onChangeText ={text => ({text:text})} 
//               onChangeText={text => PlayName_handler(text)}
//               tcolor='black'
//               style={{height: 35, color:'black', borderColor: 'black',borderWidth: 1,padding: 10, borderRadius: 5, width: 147} }
//             /> */}
        
//         </View>
        
//       </View>

//       <View style={{padding: 20}}>
      
//         {/* <View style={styles.container1} >
//           <Text style={{fontSize:14, color: 'black'}}> Choose the map size:</Text>
//         </View> */}
//       </View>

//       <View style={{padding: 10}}>
//         {/* <RadioButton_density 
        
//         radio_props_index = {0} /> */}
//       </View>

//       <View style={{padding: 20}}>
//         {/* <View style={styles.container1} >
//           <Text style={{fontSize:14, color: 'black'}}> Choose the density of the trees:</Text>
//         </View> */}
//       </View>

//       <View style={{padding: 10}}>
//         {/* <RadioButton_size /> */}
//       </View>

//       <View style={{padding: 20}}>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        

//           <View style={{paddingVertical : 100,flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
//             <TouchableOpacity 
//               style={styles.buttonStyle}
//               onPress={(value) => {GameGeneration_handler()}}
// 		            >

//               <Text >play</Text>
              
              
//             </TouchableOpacity>
//             </View>

//           <View style={{paddingVertical : 100, flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
//             <TouchableOpacity 
//               style={styles.buttonStyle}
//               onPress={(value) => {GameGeneration_handler()}}
// 		            >

//               <Text >play</Text>
              
              
//             </TouchableOpacity>
//             </View>

//           <View style={{paddingVertical : 100,flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
//             <TouchableOpacity 
//               style={styles.buttonStyle}
//               onPress={(value) => {GameGeneration_handler()}}
// 		            >

//               <Text >play</Text>
              
              
//             </TouchableOpacity>
//             </View>
          
//         </View>
//       </View>
       
//       </ImageBackground>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   container1: {
//     flex: 2,
//     justifyContent: 'center',
//   },

//   buttonStyle: {
    
//     padding:0,
//     backgroundColor: '#00ff001C',
//     borderRadius:10,
//     borderColor: 'black',
//     borderWidth: 1,
//     height : 60,
//     width : 100,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     //paddingHorizontal: 90
//     }
// });

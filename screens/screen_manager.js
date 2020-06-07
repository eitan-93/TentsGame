import {
  createAppContainer,
} from 'react-navigation';


import {
  
  createStackNavigator,
} from 'react-navigation-stack';

import MainScreen from '../screens/main_screen';
import About from '../screens/about';
import GameSettings from '../screens/game_settings';
import GameScreen from '../screens/game_screen';
import StatisticsScreen from '../screens/statistics_screen';
import LoadScreen from '../screens/load_screen';

const Screens = createAppContainer(
  createStackNavigator(
  {
    MainScreen: {screen: MainScreen,
      navigationOptions: {
        headerBackTitleVisible: false,
        headerShown: false,
      }
    
    },
    About: {screen: About,
      navigationOptions: {
        headerTransparent: {
          backgroundColor: 'transparent',
          top: 200,
          left: 0,
          right: 0
        },
        headerBackTitleVisible: false,
        headerTitle:() => {false},
        headerShown: true,
        headerTintColor :'green',
      }
    },
    GameSettings: {screen: GameSettings,
      navigationOptions: {
        headerTransparent: {
          backgroundColor: 'transparent',
          top: 200,
          left: 0,
          right: 0
        },
        headerBackTitleVisible: false,
        headerTitle:() => {false},
        headerShown: true,
        headerTintColor :'green',
              }
      
    },
    StatisticsScreen: {screen: StatisticsScreen,
      navigationOptions: {
        headerTransparent: {
          position: 'absolute',
          backgroundColor: 'red',
          // zIndex: 100,
          top: 200,
          left: 0,
          right: 0        
        },
        headerBackTitleVisible: false,
        headerTitle:() => {false},
        headerShown: true,
        //tabBarVisible: false ,
        headerTintColor :'green',
      }
    },
    LoadScreen: {screen: LoadScreen,
      navigationOptions: {
        headerTransparent: {
          position: 'absolute',
          backgroundColor: 'red',
          // zIndex: 100,
          top: 200,
          left: 0,
          right: 0        
        },
        headerBackTitleVisible: false,
        headerTitle:() => {false},
        headerShown: true,
        //tabBarVisible: false ,
        headerTintColor :'green',
      }
    },
    GameScreen: {screen: GameScreen,
      navigationOptions: {
        headerTransparent: {
          // position: 'absolute',
          backgroundColor: 'transparent',
          // zIndex: 100,
          top: 200,
          left: 0,
          right: 0        },
        headerBackTitleVisible: false,
        headerTitle:() => {false},
        headerShown: true,
        headerTintColor :'green',
      }
    },
  },

  {

  }
)
);






export default Screens;
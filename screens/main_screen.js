import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

var txt = '';

import {UpdateStatistics} from '../screens/statistics_screen';





class TextButton extends React.Component {

  static defaultProps = {
      nextScreen: '',
      txt: 'Default Value',
      pad: 0,
      navigation: null
  };

  render = () => {
    return (
      <View style={{paddingBottom: this.props.pad}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      

        <View style={{flex:1, flexBasis: 0 , justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate(this.props.nextScreen)}
              >
            <Text adjustsFontSizeToFit = {true}> {this.props.txt}</Text>
            
            
          </TouchableOpacity>
          </View>
        
      </View>
    </View>
    );
  }
};



export default class MainScreen extends Component{
  
  static defaultProps = {
    text: 'You\'re given a square grid map with trees in some cells and two lists of numbers, specifying the number of '+
  'tents you must place in each row and column. Your goal is to place them such that: \n\n• Every tree has exactly 1 tent associated and adjacent \n  (not diagonally) to it.\n\n• Each tent must be associated with a single tree.\n\n• There are no adjacent tents – no two tents in vertically,\n   horizontally or diagonally neighboring cells.\n\n• Each row and column contains tents according to the\n   specified number.'
    
}; 


    render() {
      UpdateStatistics(null, false)

        return(
            <View style = {styles.container}>
                <ImageBackground source={require('../icons/001.jpg')} style={{width: '100%', height: '100%', width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>    
                <View style={{padding: 50}}>
                  <View style={styles.container} >
                    <Text style={{fontSize:25, color: 'green'}}> Welcome to Tents!</Text>
                  </View>
                </View>  
                <Text style={{fontSize:15, paddingLeft : 10,color: '#1E5631'}}> {this.props.text} </Text>
                <View style={{padding: 0}}>
                    

                    <TextButton navigation = { this.props.navigation} txt = {'Play!'} nextScreen = 'GameSettings' pad={25} />
                    <TextButton navigation = { this.props.navigation} txt = {'Statistics'} nextScreen = 'StatisticsScreen' pad={25}/>
                    <TextButton navigation = { this.props.navigation} txt = {'About'} nextScreen = 'About' pad = {0}/>

    
                </View>
                </ImageBackground>
            </View>
        )
    }
}



const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    flex: 2,
    justifyContent: 'center',
  },

  buttonStyle: {
    
    padding:0,
    backgroundColor: '#00ff001C',
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 1,
    height : 60,
    width : 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    }
});

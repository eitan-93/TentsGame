import React, { Component } from 'react';

import RadioForm  from 'react-native-simple-radio-button';
import { StyleSheet, Dimensions, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


var radio_props = [[
  {label: 'low', value: 1 },
  {label: 'medium', value: 2 },
  {label: 'high', value: 3 },
],

[{label: 'small', value: 5 },
  {label: 'medium', value: 10 },
  {label: 'big', value: 13 },
]];
  const GameSettings = ({ navigation }) => (
    <Game_Settings navigation = {navigation}/>
  );


export default GameSettings;



class Game_Settings extends Component {

static defaultProps = {
  navigation: null,
};

constructor() {
  super()
  this.state = {
    PlayerName: '',
    MapSize: 5,
    TreeDensity: 0,
     }

}


render() {
  return (
    
    <View>
      <ImageBackground source={require('../icons/001.jpg')} style={{width: '100%', height: '100%', width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>    
       
      <View style={{padding: 50}}>
        <View style={styles.container} >
          <Text style={{fontSize:20, color: 'green'}}> Choose Your Settings </Text>
        </View>
      </View>

      <View style={{padding: 20}}>
      
        <View style={{flex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style= {{paddingRight : 150,justifyContent: 'center',}}>Your name:</Text>
        
            <TextInput
              maxLength={50}
              placeholder = "John Doe"
              placeholderTextColor= '#464b52'
              onChangeText={text => this.setState({PlayerName : text})}
              tcolor='black'
              style={{height: 35, color:'black', borderColor: 'black',borderWidth: 1,padding: 10, borderRadius: 5, width: 147} }
            />
        
        </View>
        
      </View>
      <View style={{padding: 20}}>
      
        <View style={styles.container1} >
          <Text style={{fontSize:14, color: 'black'}}> Choose the density of the trees:</Text>
        </View>
      </View>

      <View style={{padding: 10}}>


        <View style= {{justifyContent: 'center'}}>
  
          <RadioForm
            // radio_props_index  = {0}
            radio_props={radio_props[0]}
            initial={0}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#50C900'}
            selectedButtonColor= {'green'}
            backgroundColor = {'green'}
            animation={true}
            onPress={(value) => {this.setState({TreeDensity : value})}}

          />
        </View>

      </View>

      <View style={{padding: 20}}>
        <View style={styles.container1} >
          <Text style={{fontSize:14, color: 'black'}}> Choose the map size:</Text>
        </View>
      </View>

      <View style={{padding: 10}}>



    <View style= {{justifyContent: 'center'}}>
        <RadioForm
          //radio_props_index  = {0}
          radio_props={radio_props[1]}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#50C900'}
          selectedButtonColor= {'green'}
          backgroundColor = {'green'}
          animation={true}
          
          onPress={(value) => {this.setState({MapSize : value})}}
        />
      </View>


      </View>

      <View style={{padding: 60}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        

          <View style={{flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.buttonStyle}

              navigation={this.props.navigation}
              onPress={() => {
                let density = 5 
                switch(this.state.TreeDensity) {
 
                  case 1:
                    density = this.state.MapSize
                    break;
                  
                  case 2:
                    density = this.state.MapSize*2
                    break;
             
                  case 3:
                    density = this.state.MapSize*this.state.MapSize
                    break;
                  // default:
                  //   Alert.alert("NUMBER NOT FOUND");
                
                  }
                this.props.navigation.navigate('GameScreen',{isGenerated : true ,size : this.state.MapSize, density : density, name : this.state.PlayerName})} }
		            >

              <Text >Confirm</Text>
              
              
            </TouchableOpacity>
            </View>
            
            <View style={{flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              // onPress={() => GameScreen.get_board}

              navigation={this.props.navigation}
              // navigate = {this.props.naviagtion}
              //onPress={() => GoToButton(this.props.nextScreen)}
              onPress={() => {
                
              this.props.navigation.navigate('LoadScreen')} }
		            >

              <Text >Load Game</Text>
              
              
            </TouchableOpacity>
            </View>

          
        </View>
      </View>
       
      </ImageBackground>
      
    </View>
  );

};
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container1: {
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

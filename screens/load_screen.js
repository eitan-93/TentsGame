import React, { Component } from 'react';
import {Alert, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import AsyncStorage from '@react-native-community/async-storage';


var SavedGames = []

const StoreSavedList = async () => {
    try{
        const stats = await AsyncStorage.getItem("SavedList")
        if(stats !== null) {await AsyncStorage.removeItem("SavedList")}

        var val = JSON.stringify(SavedGames)
        await AsyncStorage.setItem("SavedList", val)
    }
    catch(error){
        console.log("-------storing saved list, had a problem " + error)
    }
}

const LoadSavedList = async () => {
    try{
        const stats = await AsyncStorage.getItem("SavedList")
                
        if(stats !== null) {
            SavedGames = JSON.parse(stats)
        }
        else SavedGames = []  
    }
    catch(error){
        console.log("-------loading saved list, had a problem " + error)
    }
}


const SaveGame = async (name,date,size,density,Board,tentCount,solvedBoard,horizontalList,verticalList,statistics) => {
    try{
        LoadSavedList()
        var stats = await AsyncStorage.getItem(name + " " + date)
        if(stats !== null) {await AsyncStorage.removeItem(name + " " + date)}
        stats = await AsyncStorage.getItem(name + " " + date)

            var val = {
                name : name,
                vertical : verticalList,
                horizontal : horizontalList,
                freshBoard : Board,
                tentCount : tentCount,
                solvedBoard : solvedBoard,
                size : size,
                density : density,
                statistics : statistics
            }
            const jsonValue = JSON.stringify(val)
            console.log("1 printing in savegame " + val )
            console.log("2 printing in savegame " + jsonValue )
            await AsyncStorage.setItem((name + " " + date), jsonValue)
            SavedGames.push(
                {name: name, date : date}

            )
        const saved = JSON.stringify(SavedGames)
        await AsyncStorage.removeItem("SavedList")
        await AsyncStorage.setItem("SavedList", saved)
        Alert.alert('Saved successfully!');
    }
    catch(error){
        console.log("-------SaveGame has a problem" + error)
        Alert.alert('error: Saved Unsuccessfully');
    }
}

const LoadScreen = ({ navigation }) => (
    <Load_Screen navigation = {navigation}/>
  );


class Load_Screen extends Component {

    static defaultProps = {
      navigation: null,
    };
    
    constructor() {
      super()
      this.state = {
        currSelected : null,
        currIndex : 0,
        isSelected : false,

        name : '',
        density : 0,
        vertical : [],
        horizontal : [],
        freshBoard : [],
        tentCount : 0,
        solvedBoard : [],
        size : 0,
        statistics : null,
        data: []
    }
    this.DeleteGame = this.DeleteGame.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.LoadGame = this.LoadGame.bind(this)    
}

    
LoadGame = async (key) => {
    try{
        if(key !== null){
            await AsyncStorage.getItem(key)
            .then((value) => {
                var val  = JSON.parse(value)
                this.setState({
                    name : val.name,
                    density : val.density,
                    vertical : val.vertical,
                    horizontal : val.horizontal,
                    freshBoard : val.freshBoard,
                    tentCount : val.tentCount,
                    solvedBoard : val.solvedBoard,
                    size : val.size,
                    statistics : val.statistics
                })
            })
            
        }
    }
    catch(error){
        console.log("-------LoadGame has a problem " + error)
    }
}

    DeleteGame = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    } 
    
    componentDidMount(){
        this.props.navigation.addListener(
            'didFocus',
            () => {
                LoadSavedList()
                .then(() => {
                    this.setState({
                        data : SavedGames
                    })
                })
            }
          );

        LoadSavedList()
        .then(() => {
            this.setState({
                data : SavedGames
            })
        })
    }
    
    render() {
      return (

            <View style = {styles.container}>
                <ImageBackground source={require('../icons/001.jpg')} style={{width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>    
                <View style={{padding: 50}}>
                  <View style={styles.container} >
                    <Text style={{fontSize:25, color: 'green'}}> Saved Games</Text>
                  </View>
                </View> 
                    <View style={{flex: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <View style={{height: 230}} >
                    <Leaderboard 
                        oddRowColor ={'#00000000'}
                        evenRowColor={'#00000000'}
                        onRowPress ={ (item,index) => {

                            this.setState({
                                currSelected : item,
                                currIndex : index,
                                isSelected : true
                            })
                        }}

                            data = {this.state.data} 
                            sortBy = 'date' 
                            labelBy = 'name'/>
                    </View>

                        <View padding = {10} style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            navigation={this.props.navigation}
                            onPress={() => {
                                if(this.state.isSelected){
                                    this.LoadGame(this.state.currSelected.name + " " + this.state.currSelected.date)
                                    .then(() => {
                                        this.props.navigation.navigate('GameScreen',{isGenerated : false, 
                                            size : this.state.size, 
                                            density : this.state.density, 
                                            name : this.state.name,
                                            horizontal: this.state.horizontal,
                                            vertical: this.state.vertical,
                                            freshBoard: this.state.freshBoard,
                                            tentCount : this.state.tentCount,
                                            solvedBoard: this.state.solvedBoard,
                                            statistics: this.state.statistics})
                                        this.setState({isSelected : false})
                                    })
                                                                          
                                    }
                            } }>
                            <Text >Load</Text>
                        </TouchableOpacity>
                    </View>

                    <View padding = {10} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity 
                    
                            style={styles.buttonStyle}
                            onPress={() => {
                                if(this.state.isSelected){
                                    key = this.state.currSelected.name +" "+this.state.currSelected.date
                                    SavedGames = SavedGames.filter((el) => {console.log("to delete "+ key + " " +el.name+" "+el.date); return (el.name+" "+el.date)!== key})
                                    this.setState({
                                        data : SavedGames,
                                        isSelected : false
                                    });
                                    this.DeleteGame(key) ? console.log("delete game:removed item") :  console.log("delete game:item doesn't exist")
                                    StoreSavedList()   
                                }
                            }}>
                            <Text >Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View padding = {10} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={() => {
                                this.state.data.forEach(element => {
                                    key = element.name +" "+element.date
                                    this.DeleteGame(key) ? console.log("delete game:removed item") :  console.log("delete game:item doesn't exist")
                                });

                                this.DeleteGame('SavedList') ? console.log("clear saved games: removed item") :  console.log("clear saved games:item doesn't exist")         
                                this.setState({
                                    data : []
                                })
                                SavedGames = []
                            } }>
                            <Text >Clear Saves</Text>
                    
                    
                        </TouchableOpacity>
                    </View>                   
                    </View>
                </ImageBackground>
            </View>
      
        )}; 
}

export default LoadScreen;
export {SaveGame};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

    },
    ImageIconStyle: {
        margin: 3,
        height: 5,
        width: 5,
        resizeMode: 'stretch',
      },
});


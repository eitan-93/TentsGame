import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


var stat = { 
            
    GamesPlayed : 0,
    GamesWon : 0,
    numberOfLargeMaps : 0,
    numberOfMediumMaps : 0,
    numberOfSmallMaps : 0,
    percentWonOutOfPlayed : '',
    persentOfLargeMaps : '',
    persentOfMediumMaps : '',
    persentOfSmallMaps : '',
    TotalNumberOfMoves : 0,
    TotalNumberOfBadMoves : 0,
    SumOfDensities : 0,
    AvarageMovesPerGame : 0,
    AvarageBadMovesPerGame : 0,
    AvarageTreeDensityPerGame : 0,

}

const UpdateStatistics = async (value,bool) => {
    try{
        const stats = await AsyncStorage.getItem('stats')
                
        if(stats !== null) {
        const stats1 = JSON.parse(stats)

                stat.GamesPlayed = stats1.GamesPlayed
                stat.GamesWon = stats1.GamesWon
                stat.numberOfLargeMaps = stats1.numberOfLargeMaps
                stat.numberOfMediumMaps = stats1.numberOfMediumMaps
                stat.numberOfSmallMaps = stats1.numberOfSmallMaps
                stat.percentWonOutOfPlayed = stats1.percentWonOutOfPlayed
                stat.persentOfLargeMaps = stats1.persentOfLargeMaps
                stat.persentOfMediumMaps = stats1.persentOfMediumMaps
                stat.persentOfSmallMaps = stats1.persentOfSmallMaps
                stat.TotalNumberOfMoves = stats1.TotalNumberOfMoves
                stat.TotalNumberOfBadMoves = stats1.TotalNumberOfBadMoves
                stat.SumOfDensities = stats1.SumOfDensities
                stat.AvarageMovesPerGame = stats1.AvarageMovesPerGame
                stat.AvarageBadMovesPerGame = stats1.AvarageBadMovesPerGame
                stat.AvarageTreeDensityPerGame = stats1.AvarageTreeDensityPerGame
            
        }
        if (bool){UpdateStats(value)}
        const jsonValue = JSON.stringify(stat)
        await AsyncStorage.setItem('stats', jsonValue)
        
    }
    catch(error){
        console.log("-------UpdateStatistics has a problem " + error)
    }
}



    var UpdateStats = (value) => {
                    
            stat.GamesPlayed = stat.GamesPlayed + value.didplay
            stat.GamesWon = stat.GamesWon + value.didWin
            stat.numberOfLargeMaps = stat.numberOfLargeMaps + value.isLargeMaps
            stat.numberOfMediumMaps = stat.numberOfMediumMaps + value.isMediumMaps
            stat.numberOfSmallMaps = stat.numberOfSmallMaps + value.isSmallMaps
            stat.percentWonOutOfPlayed = (stat.GamesWon/stat.GamesPlayed)*100 +'%'
            stat.persentOfLargeMaps = (stat.numberOfLargeMaps/stat.GamesPlayed)*100 +'%'
            stat.persentOfMediumMaps = (stat.numberOfMediumMaps/stat.GamesPlayed)*100 +'%'
            stat.persentOfSmallMaps = (stat.numberOfSmallMaps/stat.GamesPlayed)*100 +'%'
            stat.TotalNumberOfMoves = stat.TotalNumberOfMoves + value.numberOfMoves
            stat.SumOfDensities = stat.SumOfDensities + value.density
            stat.TotalNumberOfBadMoves = stat.TotalNumberOfBadMoves + value.numberOfBadMoves
            stat.AvarageMovesPerGame = (stat.TotalNumberOfMoves + value.numberOfMoves)/(stat.GamesPlayed)
            stat.AvarageBadMovesPerGame = (stat.TotalNumberOfBadMoves + value.numberOfBadMoves)/(stat.GamesPlayed)
            stat.AvarageTreeDensityPerGame = (stat.SumOfDensities + value.density)/(stat.GamesPlayed)
            
        
    }


    clearStats = () =>{
            stat.GamesPlayed = 0
            stat.GamesWon = 0
            stat.numberOfLargeMaps = 0
            stat.numberOfMediumMaps = 0
            stat.numberOfSmallMaps = 0
            stat.percentWonOutOfPlayed = 0
            stat.persentOfLargeMaps = 0
            stat.persentOfMediumMaps = 0
            stat.persentOfSmallMaps = 0
            stat.AvarageMovesPerGame = 0
            stat.AvarageBadMovesPerGame = 0
            stat.AvarageTreeDensityPerSize = 0
        
    } 

const StatisticsScreen = ({ navigation }) => (
    <Statistics_Screen navigation = {navigation}/>
  );



class Statistics_Screen extends Component {

    static defaultProps = {
      navigation: null,
    };
    
    constructor() {
      super()
      this.state = { 
            
            GamesPlayed : 0,
            GamesWon : 0,
            numberOfLargeMaps : 0,
            numberOfMediumMaps : 0,
            numberOfSmallMaps : 0,
            percentWonOutOfPlayed : 0,
            persentOfLargeMaps : 0,
            persentOfMediumMaps : 0,
            persentOfSmallMaps : 0,
            TotalNumberOfMoves : 0,
            TotalNumberOfBadMoves : 0,
            SumOfDensities : 0,
            AvarageMovesPerGame : 0,
            AvarageBadMovesPerGame : 0,
            AvarageTreeDensityPerGame : 0,

    }
    this.renderStat = this.renderStat.bind(this)    
    this.componentDidMount = this.componentDidMount.bind(this)
    this.removeStat = this.removeStat.bind(this)
}


    renderStat = (name,value)=> {
   
    return(
        <View style={{padding: 20}}>
                    <View style={styles.container1} >
                        <Text style={{fontSize:14, color: 'black'}}> {name} {value}</Text>
                    </View>
                </View>

    )}


    removeStat = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    
    componentDidMount(){
        this.setState({
            GamesPlayed : stat.GamesPlayed,
            GamesWon : stat.GamesWon,
            numberOfLargeMaps : stat.numberOfLargeMaps,
            numberOfMediumMaps : stat.numberOfMediumMaps,
            numberOfSmallMaps : stat.numberOfSmallMaps,
            percentWonOutOfPlayed : stat.percentWonOutOfPlayed,
            persentOfLargeMaps : stat.persentOfLargeMaps,
            persentOfMediumMaps : stat.persentOfMediumMaps,
            persentOfSmallMaps : stat.persentOfSmallMaps,
            TotalNumberOfMoves : stat.TotalNumberOfMoves,
            TotalNumberOfBadMoves : stat.TotalNumberOfBadMoves,
            SumOfDensities : stat.SumOfDensities,
            AvarageMovesPerGame : stat.AvarageMovesPerGame,
            AvarageBadMovesPerGame : stat.AvarageBadMovesPerGame,
            AvarageTreeDensityPerGame : stat.AvarageTreeDensityPerSize,
    
        })
    }
    
    render() {
 
      return (


            <View style = {styles.container}>
                <ImageBackground source={require('../icons/001.jpg')} style={{width: Dimensions.get('window').width,
                                                                              height: Dimensions.get('window').height}}>    
                <View style={{padding: 50}}>
                  <View style={styles.container} >
                    <Text style={{fontSize:25, color: 'green'}}> Statistics</Text>
                  </View>
                </View> 
                    <View style={{flex: 5, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    


  <             View padding = {5} style={{height: 450}} >
                    <ScrollView paddingRight = {5} paddingLeft = {1}  padding = {0} android = {{adjustViewBounds:"true",layout_width: "100%", layout_height:"100%"}}>
                        {this.renderStat("Games Played :",this.state.GamesPlayed)}
                        {this.renderStat("Games Won :",this.state.GamesWon)}
                        {this.renderStat("Number of Large Maps :",this.state.numberOfLargeMaps)}
                        {this.renderStat("Number of Medium Maps :",this.state.numberOfMediumMaps)}
                        {this.renderStat("Number of Small Maps :",this.state.numberOfSmallMaps)}
                        {this.renderStat("Total Number Of Moves Played :",this.state.TotalNumberOfMoves)}
                        {this.renderStat("Total Number Of Bad Moves Played :",this.state.TotalNumberOfBadMoves)}
                        {this.renderStat("Avarage Moves Per Game :",this.state.AvarageMovesPerGame)}
                        {this.renderStat("Avarage Bad Moves Per/Game :",this.state.AvarageBadMovesPerGame)}
                        {this.renderStat("Avarage Tree Density/Game :",this.state.AvarageTreeDensityPerGame)}
                        {this.renderStat("Percentage Of Games Won :",this.state.percentWonOutOfPlayed)}
                        {this.renderStat("Percentage Of Large Maps :",this.state.persentOfLargeMaps)}
                        {this.renderStat("Percentage Of Medium Maps :",this.state.persentOfMediumMaps)}
                        {this.renderStat("Percentage Of Small Maps :",this.state.persentOfSmallMaps)}
                    </ScrollView>
                </View>
                <View  style={{flex:3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <TouchableOpacity 
                    
                            style={styles.buttonStyle}
                            onPress={() => {
                                this.removeStat('stats') ? console.log("clear stats:removed item") :  console.log("clear stats:item doesn't exist")
                                this.setState({
                                    GamesPlayed : 0,
                                    GamesWon : 0,
                                    numberOfLargeMaps : 0,
                                    numberOfMediumMaps : 0,
                                    numberOfSmallMaps : 0,
                                    percentWonOutOfPlayed : 0,
                                    persentOfLargeMaps : 0,
                                    persentOfMediumMaps : 0,
                                    persentOfSmallMaps : 0,
                                    TotalNumberOfMoves : 0,
                                    TotalNumberOfBadMoves : 0,
                                    SumOfDensities : 0,
                                    AvarageMovesPerGame : 0,
                                    AvarageBadMovesPerGame : 0,
                                    AvarageTreeDensityPerGame : 0,
                                });
                                
                            } }
                                >
            
                            <Text >Clear Statistics</Text>
                    
                    
                        </TouchableOpacity>
                    </View>
                       
                    </View>
                </ImageBackground>
            </View>
      
        )};
    
    
    
}


export default StatisticsScreen;
export {UpdateStatistics};


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
        // padding: 10,
        margin: 3,
        height: 5,
        width: 5,
        resizeMode: 'stretch',
      },
});


import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, View, ImageBackground, TouchableOpacity ,TouchableHighlight} from 'react-native';
import TentsSolver from '../TentsSolver';
import {UpdateStatistics} from '../screens/statistics_screen';
import {SaveGame} from '../screens/load_screen';

var tentCount = 0;
var SaveBoard = [];
var GamesPlayed = 0;

var statistics = {
    GamesPlayed : 0,
    didplay : 0,
    didWin : 0,
    isLargeMaps : 0,
    isMediumMaps : 0,
    isSmallMaps : 0,
    density : 0,
    numberOfMoves : 0,
    numberOfBadMoves : 0,
}

clearStats = (statistics) =>{
    statistics.didplay = 0
    statistics.didWin = 0
    statistics.isLargeMaps = 0
    statistics.isMediumMaps = 0
    statistics.isSmallMaps = 0
    statistics.density = 0
    statistics.numberOfMoves = 0
    statistics.numberOfBadMoves = 0

}

class GameCell extends Component{
    static defaultProps = {
        cellSize : 1,
        solvedBoardcellval : '',
        Boardcellval : '',
        returnCorrectTents : null,
        showSolution : false,
        hint : false,
        isGenerated : false,
        i : 0,
        j : 0
    };
    constructor() {
        super()
        this.state = {
            to_rend : false,
            to_rend_save : true,
            has_put : false,
            tentBack : '#00ff001C',
            
        }

      };
      render()  {
        let SaveBoardCell = new Array(SaveBoard[this.props.j-1]).toString().charAt((this.props.i-1)*2)
        var tmp = true

        return (
                <TouchableOpacity style={{
                        padding : 0,
                        backgroundColor : this.state.tentBack,
                        borderRadius:0,
                        borderColor: 'black',
                        borderWidth: 1,
                        height : this.props.cellSize,
                        width : this.props.cellSize,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'}}
                        color='white'
                        onPress={() => { 

                                        
                                        this.props.solvedBoardcellval == 1 ? (SaveBoard[this.props.j-1][this.props.i-1] = 1) : 
                                        (SaveBoardCell == 2? (SaveBoard[this.props.j-1][this.props.i-1] = 0) : (SaveBoardCell == 0 ? (SaveBoard[this.props.j-1][this.props.i-1] = 2) : null ) )
                                                                                
                                        if(this.props.Boardcellval == 2 && !this.props.isGenerated && this.state.to_rend_save){
                                            this.state.has_put = true
                                            tmp = false
                                            this.setState(prevState => ({
                                                has_put: true,
                                                to_rend_save : !prevState.to_rend_save,
                                            }));

                                        }
                                        else {
                                            this.setState(prevState => ({
                                                to_rend: !prevState.to_rend,
                                            }));

                                        }
                                     
                                        if((this.props.solvedBoardcellval == 2) && !this.state.has_put && !this.props.showSolution){
                                            if(!this.props.showSolution){tentCount++}
                                            statistics.numberOfMoves++
                                            
                                            this.setState({ has_put : true, tentBack : '#00ff001C'})
                                        }
                                        else if((this.props.solvedBoardcellval == 2) && this.state.has_put && !this.props.showSolution){
                                            if(!this.props.showSolution){tentCount--}
                                            this.setState({ has_put : false})
                                        }
                                        
                                        else if ((this.props.solvedBoardcellval == 0) && !this.state.has_put && !this.props.showSolution){
                                            if(!this.props.showSolution){tentCount--}
                                            statistics.numberOfMoves++
                                            statistics.numberOfBadMoves++
                                            this.setState({ has_put : true, tentBack : this.props.hint ? '#ff0000' : '#00ff001C'})
                                        }
                                        else if ((this.props.solvedBoardcellval == 0) && this.state.has_put && !this.props.showSolution){
                                            if(!this.props.showSolution){tentCount++}
                                            this.setState({ has_put : false,  tentBack : '#00ff001C'})
                                        }    
                                        this.props.returnCorrectTents()   
                                    }
                        }
                    >
                    {this.props.solvedBoardcellval == 1 ?<ImageBackground source={require('../icons/002p.png')} style={{width: '95%', height: '95%'}} />  : 
                    ((((this.props.solvedBoardcellval == 2 && this.props.showSolution) || (this.state.to_rend && tmp)) 
                    || (this.props.Boardcellval == 2 && !this.props.showSolution && this.state.to_rend_save )) ? <ImageBackground source={require('../icons/003p.png')} style={{width: '95%', height: '95%'}} />: <Text></Text>)}
                   
                    </TouchableOpacity>

        );
      }

}

export default class GameScreen extends React.Component {
    static defaultProps = {
        numOfCorrectTents : 0
    };

    constructor() {
        super()
        this.state = {
            size : 5,
            density : 25,
            name : '',
            numOfTents : 0,
            verticalList : [],
            horizontalList : [],
            Board : [],
            solvedBoard : [],
            win : false,
            showSolution : false,
            hint : false,
            didUpdate :false,
            isGenerated : false

           }

        this.MakeGeneratedBoard = this.MakeGeneratedBoard.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.NewHOC = this.NewHOC.bind(this)
        this.apiFunctionWrapper = this.apiFunctionWrapper.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.MakeFromSave = this.MakeFromSave.bind(this)
        this.MakeSaveBoard = this.MakeSaveBoard.bind(this)
      }
      
      getCorrectTents = () => {
        console.log("in getCorrectTents, tentcount : "+tentCount) 

        if((this.state.numOfTents === tentCount)){
            this.setState({win : true })

            if(!this.state.didUpdate){
                this.setState({didUpdate : true})
                statistics.didWin++
                statistics.GamesPlayed = GamesPlayed

                UpdateStatistics(statistics, true)
                .then( () => {GamesPlayed = 0 , clearStats(statistics)})
            }

            console.log("GAME OVER - You Won!")
            
        }    
    }
    

    MakeFromSave = () =>{
        this.setState({
            name : this.props.navigation.state.params.name,
            horizontalList: this.props.navigation.state.params.horizontal,
            verticalList: this.props.navigation.state.params.vertical,
            Board: this.props.navigation.state.params.freshBoard,
            solvedBoard: this.props.navigation.state.params.solvedBoard,
            numOfTents :  this.props.navigation.state.params.horizontal.reduce(function(accu, currVal) {return accu += currVal}),
        })
        tentCount = this.props.navigation.state.params.tentCount

    }

    MakeSaveBoard(){

       
        for (let i = 0; i < (this.state.size); i++) {
            let row = [];
            let cellArr = new Array(this.state.Board[i]).toString()
            for (let j = 0; j < (this.state.size); j++) {
                cellArr.charAt((j)*2) == 1 ? row.push(1) : row.push(0)    
            }
            SaveBoard.push(row)
        }
    }

    MakeGeneratedBoard = async () =>{
        try{
            var obj1 
            var obj = await this.apiFunctionWrapper()
            
            .then((obj) => {
            obj1 = JSON.parse(obj)
            })
            .then( () => {
                tentCount = 0;
                this.setState({
                    verticalList : obj1.vertical,
                    horizontalList : obj1.horizontal,
                    Board : obj1.freshBoard,
                    solvedBoard : obj1.solvedBoard,
                    numOfTents : obj1.horizontal.reduce(function(accu, currVal) {return accu += currVal}),
                })
            })
        }
        catch(error){
            console.error("ERROR:" + error);
        }
        
    };


    componentDidMount() {
        if(this.state.isGenerated){
            GamesPlayed++
            this.MakeGeneratedBoard()
        }
        else this.MakeFromSave()
            this.setState({to_rend : false})
    }
    


    createBoard = () => {
        const rendBoard = [];
        let lst_key = 0;

        let cell = (Math.round(Dimensions.get('window').width)/(this.state.size + 1))*0.9;    
        SaveBoard = []        

        console.log(this.state.verticalList)
        console.log(this.state.horizontalList)
        console.log(this.state.Board)
        console.log(this.state.solvedBoard)
        console.log(this.state.numOfTents)
        console.log(this.state.numOfCorrectTents)
        this.MakeSaveBoard();
        
        if(!this.state.win){
            for (let i = 0; i < (this.state.size + 1); i++) {
                let row = [];
             for (let j = 0; j < (this.state.size + 1); j++) {
                if( i === 0  && j === 0){
                    row.push(<TouchableOpacity style={{
                        padding : 0,
                        backgroundColor : '#00000000',
                        borderRadius:0,
                        borderColor: '#00000000',
                        borderWidth: 1,
                        height : cell,
                        width : cell,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'}}
                        color='white'
                        key={lst_key++}
                    />
                    )}
                if( i === 0  && j !== 0) {
                    row.push(<TouchableHighlight  style={{
                        padding : 0,
                        backgroundColor : '#00000000',
                        borderRadius:0,
                        borderColor: 'black',
                        borderWidth: 1,
                        height : cell,
                        width : cell,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'}}
                        color='white'
                        key={lst_key++}
                    >
                    <Text>{this.state.verticalList[j-1]}</Text>
                    </TouchableHighlight>
                    
                    )
                }
                if( j === 0 && i !== 0) {
                    row.push(<TouchableHighlight style={{
                        padding : 0,
                        backgroundColor : '#00000000',
                        borderRadius:0,
                        borderColor: 'black',
                        borderWidth: 1,
                        height : cell,
                        width : cell,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'}}
                        color='white'

                    key={lst_key++}
                    >
                    <Text>{this.state.horizontalList[i-1]}</Text>
                    </TouchableHighlight>
                    )

                }
                if ( i!== 0 && j !==0){
                    
                    row.push(
                        <GameCell
                              cellSize = {cell} 
                              solvedBoardcellval = {new Array(this.state.solvedBoard[j-1]).toString().charAt((i-1)*2)}
                              Boardcellval = {new Array(this.state.Board[j-1]).toString().charAt((i-1)*2)}
                              key = {lst_key++}
                              returnCorrectTents = {this.getCorrectTents}
                              showSolution = {this.state.showSolution}
                              i ={i}
                              j = {j}
                              has_put = {false}
                              hint = {this.state.hint}
                              isGenerated = {this.state.isGenerated}
                              ></GameCell>
                    )

                }
             }

            rendBoard.push(<View className='row'  key={lst_key++}>{row}</View>)
         }
         return rendBoard
        }
        else return (<View>
            <TouchableHighlight style={{
                padding : 0,
                backgroundColor : '#00000000',
                borderRadius:0,
                borderColor: '#00000000',
                borderWidth: 1,
                height : (Math.round(Dimensions.get('window').width))*0.7,
                width : (Math.round(Dimensions.get('window').width))*0.7,
                justifyContent: 'space-evenly',
                alignItems: 'center'}}
                color='white'
                onPress={() => {tentCount = this.state.numOfTents, this.setState({win : false, showSolution : true})}}
                key={lst_key++}
            >
            <ImageBackground source={require('../icons/006.png')} resizeMode= {'contain'} style={{width: '100%',height: '100%',}} />
            </TouchableHighlight>

            <TouchableHighlight style={{
                padding : 0,
                backgroundColor : '#00000000',
                borderRadius:0,
                borderColor: '#00000000',
                borderWidth: 1,
                height : (Math.round(Dimensions.get('window').width))*0.7,
                width : (Math.round(Dimensions.get('window').width))*0.7,
                justifyContent: 'space-evenly',
                alignItems: 'center'}}
                color='white'
                onPress={() => {
                    this.props.navigation.navigate('StatisticsScreen',{stat : this.state.name,statistics})} }
                key={lst_key++}
            >
            <ImageBackground source={require('../icons/007.png')} resizeMode= {'contain'} style={{width: '100%',height: '100%',}} />
            </TouchableHighlight>           
        </View>
        )
      }

         
    successfulFetch = (str) => {return str}

    failedFetch = (errStr) => {console.log(errStr.message)}


    apiFunctionWrapper() {
        return new Promise((resolve, reject) => {
            TentsSolver.GenerateBoard(this.state.size,this.state.density,(successfulFetch) => {
                resolve(successfulFetch);
            }, (failedFetch) => {
                reject(failedFetch)
            });
        });
    }
    
    NewHOC (PassedComponent)  {
        return class extends React.Component {
          render() {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <PassedComponent {...this.props} />
              </View>
            )
          }
        }
      }

    render() {
        this.state.isGenerated = this.props.navigation.state.params.isGenerated

        if(this.state.isGenerated){   
            this.state.size = this.props.navigation.state.params.size,
            this.state.density = this.props.navigation.state.params.density,
            this.state.name = this.props.navigation.state.params.name
        }
        else {
            this.state.size = this.props.navigation.state.params.size,
            this.state.density = this.props.navigation.state.params.density,
            this.state.name = this.props.navigation.state.params.name
            statistics = this.props.navigation.state.params.statistics
        }
        statistics.didplay = 1;
        statistics.density = this.state.density;
        (this.state.size === 5) ? statistics.isSmallMaps = 1 : (this.state.size === 10 ? statistics.isMediumMaps = 1 : statistics.isLargeMaps =1)

        NewComponent = this.NewHOC(this.createBoard)
      return (
    <View style = {styles.container}>
        <ImageBackground source={require('../icons/001.jpg')} style={{width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}> 
          
              <NewComponent/>
             { !this.state.win ? 
                <View style={{flexDirection: 'row',  justifyContent: 'space-between', paddingBottom: 108,alignItems: 'center'}}>

                    <View style={{flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={() => {
                                var d = new Date()

                                SaveGame(this.state.name,
                                        (d.getHours().toString()+ ":" + d.getMinutes().toString()+" "+ d.getDay().toString() + "/" + d.getMonth().toString() + "/" + d.getFullYear().toString()),
                                        this.state.size,
                                        this.state.density,
                                        SaveBoard,
                                        tentCount,
                                        this.state.solvedBoard,
                                        this.state.horizontalList,
                                        this.state.verticalList,
                                        statistics)
                            }}>

                            <Text >Save Game</Text>
                    
                    
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flex:3, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity 
                    
                            style={styles.buttonStyle}
                            onPress={() => {
                                
                                this.setState(prevState => ({
                                    hint: !prevState.hint
                                }));
                                tentCount = 0
                            } }
                                >
            
                            <Text >Hint Mode: {this.state.hint ? 'ON!' : 'off'}</Text>
                    
                    
                        </TouchableOpacity>
                    </View>

                </View> : null }
        </ImageBackground>
    </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        paddingHorizontal: 0,
        paddingLeft: 0,
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
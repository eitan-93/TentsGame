import React from 'react';
// import fs from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native';



var text = "This app was developed by Eitan Evnin;)\n"+
            "It\'s based on Eitan Sapir\'s (Big thanks to Ariel) and my final project which revolved around the Tents puzzle.\n\n"+
            "In this puzzle, one is given an n × n grid with initial markings (referred to as \'trees\') "+
            "and is tasked with placing a different type of markings (referred to as \'tents\'), under several rules."+
            "\n\nWe tackled the problem with two main approaches:\n\n"+
            "1. SAT – We define a CNF expression for an instance of the problem with the help of an article,\n\n"+
            "(SAT Encodings of the AT-Most-k Constraint : Some Old, Some New, Some Fast, Some Slow. / Frisch, Alan M.; Giannaros, Paul A.2010.)\n\n"+
            "whose solution describes a legal solution to the instance, and solve it using the SAT4J solver. "+
            "\n\n2. ILP – We construct a system of linear integer inequalities describing the "+
            "constraints of an instance, whose solution yields a legal solution for the instance, and solve it using the google ortools package."+
            "\nLater I rewrote it using Choco solver and used it in this app as a backend package."+
            "\n\nAdditionally, we built a generator which constructs solvable maps in polynomial time, "+
            "by generating a solved legal instance, with as many trees as possible, and returning an "+
            "unsolved instance for which this solution is appropriate. "+
            "This, in turn, enabled us to perform statistical analysis of tree coverage in generated maps."


const About = ({ navigation }) => (
            <View style = {styles.container}>
                <ImageBackground source={require('../icons/001.jpg')} style={{width: '100%', height: '100%', width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>    
                <View style={{padding: 50}}>
                  <View style={styles.container} >
                    <Text style={{fontSize:25, color: 'green'}}> About this app</Text>
                  </View>
                  
                </View>  
                <View style={{height: 450}} >
                <ScrollView paddingRight = {5} paddingLeft = {1}  padding = {0} android = {{adjustViewBounds:"true",layout_width: "100%", layout_height:"100%"}}>
                    <Text style={{fontSize:15, paddingLeft : 10,color: '#1E5631'}}> {text} </Text>
                </ScrollView>
                </View>
               
                </ImageBackground>
            </View>

  );

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
// Deck component to display the main information of a card deck in a list of Decks
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'


class Deck extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return ({
            title: title.toString()
        })
    }

    render() {
        const { deck, navigation } = this.props
        
        if(deck) return (
            <TouchableOpacity onPress={() =>
                navigation.navigate('DeckDetails', {title: deck.title})}>
            
            <View style={styles.deck}>
                <Text style={styles.header}>{deck.title}</Text>
                <Text>Number of questions: {
                    deck.questions ? deck.questions.length : '0'
                    }</Text>
                              
            </View>
            </TouchableOpacity> )
            else return <Text>No Deck Found</Text>
    }
}

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 300,
        borderRadius: 10,
        borderWidth: 5,
        borderStyle: 'solid' ,
        borderColor: 'pink',
        padding: 20
    },
    header: {
        fontSize: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10
      },
});


export default connect()(Deck)
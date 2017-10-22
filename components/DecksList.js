import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import Deck from './Deck'

class DecksList extends React.Component {

    render() {
        const { decks } = this.props
        return (
            <View style={styles.decks}>
                {decks ?
                    Object.keys(decks).map((deck) =>
                        <Deck deck={deck} key={deck} />)

                    : <Text style={styles.message}>You haven't created any decks yet. Click Add to create your first!</Text>}
                <View style={styles.addDeck}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDeck')}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    decks: {
        //flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckList: {
        margin: 10,
        justifyContent: 'center',
    },
    addDeck: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    message: {
        textAlign: 'center',
        margin: 10,
    }
});

export default connect()(DecksList)
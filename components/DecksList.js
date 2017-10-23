import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDecks, deleteAll } from '../utils/helpers'
import { connect } from 'react-redux'
import Deck from './Deck'
import { receiveDecks } from '../actions'

class DecksList extends React.Component {

    componentDidMount() {
        getDecks()
            .then((result) => this.props.receiveDecks(result))
    }

    render() {
        const { decks, navigation } = this.props
        console.log(decks)
        return (
            <View style={styles.decks}>
                <View>
                    <TouchableOpacity onPress={() => deleteAll()}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Delete All</Text>
                    </TouchableOpacity>
                </View>
                {decks ?
                    Object.keys(decks).map((deck) =>
                        <Deck deck={deck} navigation={navigation} key={deck} />)
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


{/* <FlatList style={styles.deckList}
                    data={decks ? decks : []}
                    renderItem={decks ? ({item}) => <Deck deck={item} navigation={navigation} key={item.title} />
                        : <Text style={styles.message}>You haven't created any decks yet. Click Add to create your first!</Text>} >
                </FlatList> */}
// {decks ?
//     Object.keys(decks).map((deck) =>
//         <Deck deck={deck} navigation={navigation} key={deck} />)

//     : <Text style={styles.message}>You haven't created any decks yet. Click Add to create your first!</Text>} 


const styles = StyleSheet.create({
    decks: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckList: {
        margin: 10,
        //justifyContent: 'center',
    },
    addDeck: {
        backgroundColor: '#998',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    message: {
        textAlign: 'center',
        margin: 10,
    }
});

function mapStateToProps({ decks }) {
    return decks
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDecks: (data) => dispatch(receiveDecks(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksList)
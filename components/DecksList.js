// DecksList component to render a list of Deck components
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { AppLoading } from 'expo'
import { getDecks, deleteAll } from '../utils/helpers'
import { connect } from 'react-redux'
import Deck from './Deck'
import { receiveDecks } from '../actions'

class DecksList extends React.Component {

    state = {
        ready: false
    }

    componentDidMount() {
        getDecks()
            .then((result) => this.props.receiveDecks(result))
            .then(() => this.setState({ ready: true }))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changed)
            getDecks()
                .then((result) => {
                    this.setState({ ready: false })
                    this.props.receiveDecks(result)
                })
                .then(() => this.setState({ ready: true }))
    }

    render() {
        const { decks, navigation } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View style={styles.decks}>
                <View style={{display: 'none'}}>
                    <TouchableOpacity onPress={() => deleteAll()}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Delete All</Text>
                    </TouchableOpacity>
                </View>
                {decks ?
                <FlatList 
                    data={Object.keys(decks)}
                    extraData= {this.props.decks}
                    keyExtractor={(item, index) => item}
                    renderItem={({item}) => <Deck 
                    deck={this.props.decks[item]} 
                    navigation={navigation} 
                    
                     />
                     } />                                   
                    : <Text style={styles.message}>You haven't created any decks yet. Click Add to create your first!</Text>}

                <View style={styles.addDeck}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDeck')}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Add Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    decks: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckList: {
        margin: 10,
        justifyContent: 'space-around',
        elevation: 5
    },
    deck: {
        margin: 10,
        elevation: 5
    },
    addDeck: {
        backgroundColor: '#996',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 5
    },
    message: {
        textAlign: 'center',
        margin: 10,
    }
});

function mapStateToProps({ decks, changed }) {
    return { decks, changed }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDecks: (data) => dispatch(receiveDecks(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksList)
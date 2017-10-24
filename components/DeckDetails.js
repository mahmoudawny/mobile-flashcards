import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'

//TODO: render Decks as list and check the need to create a second stack for Deck and DeckDetails
class DeckDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return ({
            title: title.toString()
        })
    }

    state = {
        ready: false
    }

    componentDidMount() {
        const { title } = this.props.navigation.state.params
        getDeck(title)
            .then((deck) => this.props.receiveDeck(title))
            .then(() => this.setState({ ready: true }))
    }

    render() {
        const { deck, navigation } = this.props
        if (!this.state.ready)
            <AppLoading />
        return (
            <View style={styles.deck}>

                <Text>{deck ? deck.title : ''}</Text>
                <Text>Number of questions: {deck ?
                    deck.questions ? deck.questions.length : '0'
                    : '0'}</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('AddCard', { title: deck.title + ' New Card' })}>
                        <Text>
                            Add Question
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
});

function mapStateToProps({ decks }, { navigation }) {
    const { title } = navigation.state.params
    return {
        deck: decks[title]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDeck: (data) => dispatch(receiveDeck(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
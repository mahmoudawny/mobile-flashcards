// DeckDetails component to display the main information of a deck and render CardDetails component
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'
import CardDetails from './CardDetails'

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
            .then((deck) => this.props.receiveDeck({ title, deck }))
            .then(() => this.setState({ ready: true }))
    }

    render() {
        const { navigation } = this.props
        const { deck } = this.props
        if (this.state.ready && deck)
            return (
                <View style={styles.deck}>
                    <Text>{deck.title}</Text>
                    <Text>Number of questions: {deck.questions ? deck.questions.length
                        : 0}</Text>
                    <CardDetails questions={deck.questions ? deck.questions : []} navigation={navigation} />
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('AddCard', { title: deck.title })}>
                            <Text style={styles.buttonText}>
                                Add Question
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        else return <AppLoading />
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#998',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
});

function mapStateToProps({ deck }, { navigation }) {
    return {
        deck,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDeck: (data) => dispatch(receiveDeck(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
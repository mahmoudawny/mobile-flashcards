// DeckDetails component to display the main information of a deck and render CardDetails component
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
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
        ready: false,
        height: new Animated.Value(0),
        opacity: new Animated.Value(0),
    }

    componentDidMount() {
        const { title } = this.props.navigation.state.params
        getDeck(title)
            .then((deck) => this.props.receiveDeck({ title, deck }))
            .then(() => this.setState({ ready: true }))
        const { height, opacity } = this.state
        Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
        Animated.spring(height, { toValue: 400, speed: 1 }).start()
    }

    render() {
        const { navigation } = this.props
        const { deck } = this.props
        const { height, opacity } = this.state
        if (this.state.ready && deck)
            return (
                <Animated.View style={[styles.deck, { height, opacity }]}>
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
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('QuizScreen', { title: "Quiz", questions: deck.questions })}>
                            <Text style={styles.buttonText}>
                                Start a Quiz
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )
        else return <AppLoading />
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 5
    },
    button: {
        backgroundColor: '#996',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 5
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
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'
import CardDetails from './CardDetails'

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
        const {  navigation } = this.props
        const {  decks } = this.props.decks
        if (!this.state.ready && !decks)
            <AppLoading />
        
        return (
            <View style={styles.deck}>
                <Text>{decks.title}</Text>
                <Text>Number of questions: {decks.questions.length}</Text>
                    <CardDetails navigation={navigation}/>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('AddCard', { title: decks.title})}>
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
        padding: 10
    },
    button: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
});

function mapStateToProps(decks, { navigation }) {
    const { title } = navigation.state.params
    return {
        decks,
        // title,
        // navigation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDeck: (data) => dispatch(receiveDeck(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
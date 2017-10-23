import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import {receiveDeck, addQuestion} from '../actions'

class DeckDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        
        return ({
            title: title.toString()
        })
    }

    componentDidMount() {
        const { title } = navigation.state.params
        this.props.getDeck(title)
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.deck}>

                <Text>{deck ? deck.title : 'Empty'}</Text>
                <Text>Number of questions: {deck ?
                    deck.questions ? deck.questions.count() : '0'
                    : '0'}</Text>
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('AddCard', {title: deck.title})}>
                    <Text>
                        Add Question
                    </Text>
                </TouchableOpacity>
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
});

function mapStateToProps(state, {navigation}) {
    const { title } = navigation.state.params
    return {
        deck: state[title]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDeck: (data) => dispatch(receiveDeck(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
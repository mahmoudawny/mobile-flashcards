import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import {connect} from 'react-redux'


export default class Deck extends React.Component {
    addQuestion = () => {
        addCardToDeck()
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.deck}>

                <Text>{deck ? deck.title : 'Empty'}</Text>
                <Text>Number of questions: {deck ? deck.questions.count() : 'Add questions and answers.'}</Text>
                <TouchableOpacity onPress={this.addQuestion}>
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
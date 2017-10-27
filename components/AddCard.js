// AddCard component to render the Add Card form
import React from 'react'
import {
    TextInput, StyleSheet, Text, View, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { addQuestion, receiveDeck } from '../actions'
import { addCardToDeck, getDeck } from '../utils/helpers'
import { connect } from 'react-redux'


class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return ({
            title
        })
    }

    state = {
        question: '',
        answer: ''
    }

    addCard = () => {

        const { question, answer } = this.state
        const { addQuestion, goBack, title } = this.props
        if (question && answer) {
            addCardToDeck(title, question, answer)
                .then((result) => addQuestion({ title, question, answer }))
            goBack()
        }
    }

    render() {
        const { deck, navigation } = this.props
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.deck}>
                <TextInput style={styles.input} autoCapitalize='sentences'
                    autoFocus={true}
                    required={true}
                    returnKeyType='next'
                    clearButtonMode='always'
                    blurOnSubmit={true} maxLength={100}
                    placeholder='Enter the question'
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                    onSubmitEditing={() => this.refs.answer.focus()} //set focus to next input
                />
                <TextInput style={styles.input} autoCapitalize='sentences'
                    blurOnSubmit={true} maxLength={100}
                    ref='answer'
                    clearButtonMode='always'
                    placeholder='Enter the answer'
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={this.state.answer}
                    onSubmitEditing={() => this.addCard()}
                />
                <View style={question && answer ? styles.addCard : styles.disableAdd}>
                    <TouchableOpacity onPress={this.addCard}
                        disabled={question && answer ? false : true}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 320,
        fontSize: 30,
        textAlign: 'center',
        padding: 10
    },
    addCard: {
        backgroundColor: '#996',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 5
    },
    disableAdd: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 0
    },
});

function mapStateToProps(decks, { navigation }) {
    const { title } = navigation.state.params
    return {
        deck: decks[title],
        title
    }
}

function mapDispatchToProps(dispatch, { navigation }) {

    return {
        receiveDeck: (data) => dispatch(receiveDeck(data)),
        addQuestion: (data) => dispatch(addQuestion(data)),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
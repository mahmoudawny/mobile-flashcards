import React from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity,
KeyboardAvoidingView } from 'react-native'
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
        addCardToDeck(title,  question, answer )
            .then((result) => addQuestion({title,  question, answer} ))
        goBack()
    }

    render() {
        const { deck, navigation } = this.props
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.deck}>
                <TextInput style={styles.input} autoCapitalize='sentences' autoFocus={true}
                    blurOnSubmit={true} maxLength={100} 
                    placeholder='Enter the question'
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                    //onSubmitEditing={() => this.addCard()} //set focus to next input
                    />
                <TextInput style={styles.input} autoCapitalize='sentences'
                    blurOnSubmit={true} maxLength={100}
                    placeholder='Enter the answer'
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={this.state.answer}
                    onSubmitEditing={() => this.addCard()}
                />
                <View style={styles.addCard}>
                    <TouchableOpacity onPress={this.addCard}>
                        <Text>Add</Text>
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
        textAlign: 'center'
    },
    addCard: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
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
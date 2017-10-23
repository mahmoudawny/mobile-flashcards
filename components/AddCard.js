import React from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import {addQuestion, receiveDeck} from '../actions'
import { addCardToDeck, getDeck } from '../utils/helpers'
import {connect} from 'react-redux'


class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return ({
            title: title.toString() + ' New Card'
        })
    }

    state = {
        question: '',
        answer: ''
    }

    addCard = ({ navigation }) => {
        const {question, answer} = this.state
        const { title } = navigation.state.params
        addCardToDeck(title, {question, answer}).then((result) => this.props.addQuestion(title, {question, answer}))        
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.deck}>
                <TextInput autoCapitalize='true' autoFocus='true'
                blurOnSubmit='true' maxLength='100' placeholder='Enter the question and click Add'
                value={this.state.question}/>
                <TextInput autoCapitalize='true'
                blurOnSubmit='true' maxLength='100' 
                placeholder='Enter the answer and click Add'
                value={this.state.answer}
                />
                <TouchableOpacity onPress={this.addQuestion}>
                    <Text>Add</Text>
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

function mapStateToProps(state, {navigation}) {
    const { title } = navigation.state.params
    return {
        deck: state[title]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDeck: (data) => dispatch(receiveDeck(data)),
        addQuestion: (data) => dispatch(addQuestion(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
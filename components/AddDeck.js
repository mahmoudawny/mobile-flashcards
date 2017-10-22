import React from 'react'
import {
    TextInput, StyleSheet, Text, View,
    KeyboardAvoidingView, TouchableOpacity
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import {setTitle} from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import { connect } from 'react-redux'

class AddDeck extends React.Component {

    state = {
        title: ''
    }

    add = () => {
        //this.props.addDeck(this.state.title)
        saveDeckTitle(this.state.title)
    }

    render() {
        const { deck } = this.props
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.deck}>
                <TextInput style={styles.input} autoCapitalize='words' autoFocus={true}
                    blurOnSubmit={true} maxLength={50} placeholder='Enter the title and click Add'
                    onSubmitEditing={() => this.add()}
                    onChangeText={(text) => this.setState({ title: text })}
                    value={this.state.title} />
                <View style={styles.addDeck}>
                    <TouchableOpacity onPress={() => this.add()}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    input: {
        width: 320,
        fontSize: 30,
        textAlign: 'center'
    },
    addDeck: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
});


function mapDispatchToProps(dispatch) {
    return {
        addDeck: (data) => dispatch(setTitle(data))
    }
}

export default connect( mapDispatchToProps)(AddDeck)
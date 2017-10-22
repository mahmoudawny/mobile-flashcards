import React from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import dispatch from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import {connect} from 'react-redux'


class AddCard extends React.Component {
    add = () => {
        this.props.setTitle()
        saveDeckTitle
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.deck}>
                <TextInput autoCapitalize='true' autoFocus='true'
                blurOnSubmit='true' maxLength='50' placeholder='Enter the title and click Add'
                defaultValue=''/>
                
                <TouchableOpacity onPress={this.add}>
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

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps() {
    return {
        getDecks: () => dispatch.getDecks(),
        addDeck: () => dispatch.setTitle()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
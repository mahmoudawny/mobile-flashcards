import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'


//Todo: get number of questions

class Deck extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return ({
            title: title.toString()
        })
    }

    render() {
        const { deck, navigation } = this.props
        console.log(deck)
        if(deck) return (
            <TouchableOpacity onPress={() =>
                navigation.navigate('DeckDetails', {title: deck})}>
            
            <View style={styles.deck}>
                <Text style={styles.header}>{deck}</Text>
                <Text>Number of questions: {deck ?
                    deck.questions ? deck.questions.count() : '0'
                    : '0'}</Text>
                              
            </View>
            </TouchableOpacity> )
            else return <Text>No Deck</Text>
    }
}

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10
      },
});

// function mapStateToProps(state, {navigation}) {
//     const { title } = navigation.state.params
//     return {
//         deck: state[title]
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getDeck: (data) => dispatch(getDeck(data))
//     }
// }

export default connect()(Deck)
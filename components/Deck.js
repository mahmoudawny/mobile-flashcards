import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {StackNavigator} from 'react-navigation'
import {AppLoading} from 'expo'

export default class Deck extends React.Component {
  render() {
      const {deck} = this.props
    return (
      <View style={styles.deck}>
        <Text>{deck? deck.title: 'Empty'}</Text>
        <Text>Number of questions: {deck? deck.questions.count(): 'Create a deck and then add questions and answers.'}</Text>
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
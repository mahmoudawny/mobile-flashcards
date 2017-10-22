import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import DecksList from './components/DecksList'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import { getDecks } from './utils/helpers'
import AddDeck from './components/AddDeck'

class App extends React.Component {

  componentDidMount() {
    getDecks()
  }

  render() {
    const { decks } = this.props
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.app}>
          <View style={styles.statusBar}>
            <StatusBar translucent backgroundColor='pink' barStyle='dark-content' />
          </View>
          <Text style={styles.header}>Welcome to Flashcards</Text>
          <Stack  />

        </View>
      </Provider>
    );
  }
}



const Stack = StackNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      title: "Home",
      headerTitleStyle: {
        

      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "Add Deck",

    }
  }
})

const styles = StyleSheet.create({
  app: {
    flex: 1,

  },
  statusBar: {
    height: 25,
    backgroundColor: 'pink'
  },
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  header: {
    fontSize: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10
  },
  deckList: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10
  },
})

export default App
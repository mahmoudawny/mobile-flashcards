import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import DecksList from './components/DecksList'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { getDecks } from './utils/helpers'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
import logger from 'redux-logger'
import thunk from 'redux-thunk'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
applyMiddleware(thunk), applyMiddleware(logger)))

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
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
  Deck: {
    screen: Deck,

  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "Add Deck",

    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: ""
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "New Card"
    }
  },
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
    justifyContent: 'space-around',
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
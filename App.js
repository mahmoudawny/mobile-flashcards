// Main App renderer. Calls StackNavigator with DecksList component as default screen
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
import QuizScreen from './components/QuizScreen'

//TODO: Add notification, finishing any quiz should clear today's notification
//TODO: Add button and card shadows
//TODO: Add ios and android specific styles
//TODO: Add animation for opening a deck

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
applyMiddleware(thunk), applyMiddleware(logger)))

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.app}>
          <View style={styles.statusBar}>
            <StatusBar   barStyle='light-content' />
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
    
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "New Card"
    }
  },
  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: {
      title: "Quiz"
    }
  },
})

const styles = StyleSheet.create({
  app: {
    flex: 1,

  },
  statusBar: {
    height: 25,
    backgroundColor: 'rgb(200,2,200)'
  },
  container: {
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
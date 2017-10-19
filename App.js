import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import Deck from './components/Deck'
import {  Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'

class App extends React.Component {

  render() {
    const {decks} = this.props
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <Text>Welcome to Flashcards</Text>
          <Stack>
          {decks ?
            Object.keys(decks).map((deck) =>
              <Deck deck={deck} key={deck} />)
            : <Text>You haven't created any decks yet. Click Add to create your first!</Text>}
          {/* <TouchableOpacity onPress={Stack(Deck)}>
            <Text>Add</Text>
          </TouchableOpacity> */}
          </Stack>
        </View>
      </Provider>
    );
  }
}

//const Home = ({ navigation }) => (
  const Home = (
    <View>
      <Text>This is the Home view</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')}>
        <Text>Press here to open the drawer!</Text>
      </TouchableOpacity>
       */}
    </View>
  )

const Stack = StackNavigator({
  // Home: {
  //   screen: Home,
  //   navigationOptions:{
  //     title: "Home",
      
  //   }
  // },
  Deck: {
    screen: Deck,
    navigationOptions:{
      title: "Deck",
      
    }
  }
})


    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
});

// function mapStateToProps(state) {
//   return {
//     decks: { ...state }
//   }
// }

export default App
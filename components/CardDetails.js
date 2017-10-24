import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'

class CardDetails extends React.Component {

    state = {
        ready: false,
        currentCard: 1,
        show: 'q'
    }

    // componentDidMount() {
    //     const { title } = this.props.navigation.state.params
    //     getDeck(title)
    //         .then((deck) => this.props.receiveDeck(title))
    //         .then(() => this.setState({ ready: true }))
    // }

    flip = () => {
        if(this.state.show === 'q')
            this.setState({show: 'a'})
        else this.setState({show: 'q'})
    }

    render() {
        const { questions } = this.props
        const {currentCard, ready, show} = this.state
        if (!ready)
            return <AppLoading />
        return (
            <View style={styles.deck}>
                <Text>{currentCard}/{questions.length}</Text>
                {show === 'q' ?
                <Text>{show}:{questions[currentCard].question}</Text>
                : <Text>{questions[currentCard].answer}</Text>}
                <View style={styles.button}>
                    <TouchableOpacity onPress={() =>
                        this.flip()}>
                        <Text>
                            Flip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#aba',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
});

// function mapStateToProps(state) {
//     const { title } = this.props.navigation.state.params
//     return {
//         deck: state[title]
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         receiveDeck: (data) => dispatch(receiveDeck(data))
//     }
// }

export default connect()(CardDetails)
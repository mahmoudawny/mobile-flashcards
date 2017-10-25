// CardDetails component to display question and answer cards
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'

class CardDetails extends React.Component {

    state = {
        ready: false,
        currentCard: 0,
        show: 'q',
    }

    // componentDidMount() {
    //     const { title } = this.props.navigation.state.params
    //     getDeck(title)
    //         .then((deck) => this.props.receiveDeck(title))
    //         .then(() => this.setState({ ready: true }))
    // }


    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.rotateQ = this.animatedValue.interpolate({
            inputRange: [0, 90],
            outputRange: ['0deg', '180deg'],
        })
        this.rotateA = this.animatedValue.interpolate({
            inputRange: [0, 90],
            outputRange: ['180deg', '0deg']
        })
    }


    flip = () => {

        if (this.state.show === 'q') {
            Animated.spring(this.animatedValue, { toValue: 90, duration: 500 }).start()
            this.setState({ show: 'a' })
        }
        else {            
            Animated.spring(this.animatedValue, { toValue: 0, duration: 500 }).start()
            this.setState({ show: 'q' })
        }
        
    }

    render() {
        const { questions } = this.props
        const { currentCard, ready, show } = this.state
        if (questions) {
            return (
                <View style={styles.deck}>
                    <Text style={styles.numberText}>{questions.length > 0 ?
                        currentCard + 1
                        : 0}/{questions.length}</Text>
                    {questions.length > 0 ?
                        <View style={styles.card}>
                            {show === 'q' ?
                                <Animated.Text style={[styles.cardText, { transform: [{ rotateY: this.rotateQ }]}]}>
                                    Q: {questions[currentCard].question}</Animated.Text>
                                : <Animated.Text style={[styles.cardText, { transform: [{ rotateY: this.rotateA }]}]}>
                                    A: {questions[currentCard].answer}</Animated.Text>}
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() =>
                                    this.flip()}>
                                    <Text style={styles.buttonText}>
                                        Flip
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : <Text >Start adding questions to the deck!</Text>
                    }

                </View>
            )
        }
        else return <AppLoading />
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    card: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,

    },
    cardText: {
        color: 'rgb(200,2,200)',
        fontSize: 20
    },
    numberText: {
        color: 'rgb(20,2,200)',
        fontSize: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    button: {
        backgroundColor: 'rgb(20,2,200)',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        
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
// CardDetails component to display question and answer cards
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { Ionicons } from '@expo/vector-icons'

class CardDetails extends React.Component {

    state = {
        currentCard: 0,
        show: 'q',
    }

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

    prevQuestion = () => {
        const { currentCard } = this.state
        this.setState({
            currentCard: currentCard > 0 ? currentCard - 1
                : 0,
            show: 'q'
        })
        Animated.spring(this.animatedValue, { toValue: 0, duration: 500 }).start()

    }

    nextQuestion = () => {
        const { currentCard } = this.state
        const { questions } = this.props
        this.setState({
            currentCard: currentCard < questions.length - 1 ? currentCard + 1
                : currentCard,
            show: 'q'
        })
        Animated.spring(this.animatedValue, { toValue: 0, duration: 500 }).start()

    }

    render() {
        const { questions } = this.props
        const { currentCard, show } = this.state
        if (questions) {
            return (
                <View style={styles.deck}>
                    <View style={styles.cardNav}>
                        <TouchableOpacity
                            onPress={this.prevQuestion}
                            disabled={currentCard > 0 ? false : true}
                        >
                            <Ionicons
                                color={currentCard > 0 ? 'rgb(20,2,200)' : '#ddd'}
                                size={30}
                                name='ios-arrow-dropleft-circle' />
                        </TouchableOpacity>
                        <Text style={styles.numberText}>{questions.length > 0 ?
                            currentCard + 1
                            : 0}/{questions.length}</Text>
                        <TouchableOpacity
                            onPress={this.nextQuestion}
                            disabled={currentCard < questions.length - 1 ? false : true}
                        >
                            <Ionicons
                                color={currentCard < questions.length - 1 ? 'rgb(20,2,200)' : '#ddd'}
                                size={30}
                                name='ios-arrow-dropright-circle' />
                        </TouchableOpacity>

                    </View>
                    {questions.length > 0 ?
                        <View style={styles.card}>
                            {show === 'q' ?
                                <Animated.Text style={[styles.cardText, { transform: [{ rotateY: this.rotateQ }] }]}>
                                    Q: {questions[currentCard].question}</Animated.Text>
                                : <Animated.Text style={[styles.cardText, { transform: [{ rotateY: this.rotateA }] }]}>
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
                        : <Text >Start adding questions to card deck!</Text>
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
        padding: 10,
        margin: 5,
        borderRadius: 3,
        elevation: 2
    },
    cardNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        width: 300,
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
    arrow: {
        color: 'rgb(20,2,200)',
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
        justifyContent: 'center',
        height: 40,
        elevation: 5
    },
});


export default connect()(CardDetails)
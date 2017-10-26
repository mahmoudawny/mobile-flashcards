// QuizScreen to run a quiz and show score of correct answers
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { getDeck, addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { receiveDeck, addQuestion } from '../actions'
import { Ionicons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

class QuizScreen extends React.Component {

    state = {
        currentCard: 0,
        correct: 0,
        show: 'q',
        end: false,
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

    setCorrect = () => {
        this.setState({
            correct: this.state.correct + 1
        })
        this.nextQuestion()
    }

    setFalse = () => {
        this.nextQuestion()
    }

    nextQuestion = () => {
        const { currentCard } = this.state
        const { questions } = this.props.navigation.state.params
        if (currentCard === questions.length - 1)
            this.setState({
                end: true
            })
        else {
            this.setState({
                currentCard: currentCard < questions.length - 1 ? currentCard + 1
                    : currentCard,
                show: 'q'
            })
            Animated.spring(this.animatedValue, { toValue: 0, duration: 500 }).start()
        }
    }

    restart = () => {
        this.setState({
            currentCard: 0,
            correct: 0,
            show: 'q',
            end: false
        })
    }
    render() {
        const { questions } = this.props.navigation.state.params
        const { currentCard, show, correct, end } = this.state
        if (questions) {
            return (
                <View style={styles.deck}>
                    <View >
                        <Text style={styles.numberText}>{questions.length > 0 ?
                            currentCard + 1
                            : 0}/{questions.length}</Text>
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
                                        {show==='q'? 'Answer' : 'Question'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {!end &&
                                <View style={styles.buttons}>
                                    <TouchableOpacity
                                        disabled={end ? true : false}
                                        onPress={() =>
                                            this.setCorrect()}>
                                        <FontAwesome style={styles.correct}
                                            size={30}
                                            name='check-circle'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={end ? true : false}
                                        onPress={() =>
                                            this.setFalse()}>
                                        <Entypo style={styles.incorrect}
                                            size={30}
                                            name='circle-with-cross'
                                        />
                                    </TouchableOpacity>
                                </View>}
                        </View>
                        : <Text >No questions added yet!</Text>
                    }
                    {end &&
                        <View style={styles.result}>
                            <Text style={styles.resultText}>
                                Your Score: {100 * correct / questions.length} %
                            </Text>
                            <View style={styles.resultButtons}>
                                <TouchableOpacity
                                    onPress={() => this.props.goBack()}
                                    disabled={end ? false : true}
                                >
                                    <MaterialCommunityIcons
                                        style={styles.back}
                                        size={30}
                                        name='arrow-left-bold-circle-outline' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>
                                    this.restart()}>
                                    <Ionicons style={styles.resultText}
                                        size={40}
                                        name='md-refresh'
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
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
    cardNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        width: 300,
        padding: 10
    },
    card: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        padding: 10,
        borderRadius: 10,
        margin: 10
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
    correct: {
        color: 'green',
        fontSize: 40
    },
    incorrect: {
        color: 'red',
        fontSize: 40
    },
    button: {
        backgroundColor: 'rgb(20,2,200)',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35
    },
    buttons: {
        flexDirection: 'row',
        //backgroundColor: 'rgb(20,15,200)',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 200
    },
    result: {
        backgroundColor: 'rgb(20,2,200)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    resultButtons: {
        flexDirection: 'row',
        //backgroundColor: '#aba',
        width: 200,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 10,
    },
    resultText: {
        color: '#fff',
        fontSize: 30
    },
    restart: {
        color: '#fff',
        fontSize: 40
    },
    back: {
        color: '#fff',
        fontSize: 40
    },
});

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapDispatchToProps)(QuizScreen)
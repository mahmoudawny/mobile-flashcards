// QuizScreen to run a quiz and show score of correct answers
import React from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Animated, Platform
} from 'react-native'
import { AppLoading } from 'expo'
import { clearNextNotification } from '../utils/helpers'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { Ionicons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

class QuizScreen extends React.Component {

    state = {
        currentCard: 0,
        correct: 0,
        show: 'q',
        end: false,
    }

    componentWillMount() {
        // Flip Animation value interpolation
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

// flip function to animate question and answer flipping and set state
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

// setCorrect function to count correct answers, set state and get next question  
    setCorrect = () => {
        this.setState({
            correct: this.state.correct + 1
        })
        this.nextQuestion()
    }

// setFalse function to get next question  
    setFalse = () => {
        this.nextQuestion()
    }

// nextQuestion function to get next question  
    nextQuestion = () => {
        const { currentCard } = this.state
        const { questions } = this.props.navigation.state.params
        // If quiz is finished set state and clear today's notification if any
        if (currentCard === questions.length - 1) {
            this.setState({
                end: true
            })
            clearNextNotification()
        }
        // If questions remain, display next
        else {
            this.setState({
                currentCard: currentCard < questions.length - 1 ? currentCard + 1
                    : currentCard,
                show: 'q'
            })
            Animated.spring(this.animatedValue, { toValue: 0, duration: 500 }).start()
        }
    }

// restart function to reset state  
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
                                        {show === 'q' ? 'Answer' : 'Question'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {!end &&
                                <View style={styles.buttons}>
                                    <TouchableOpacity
                                        disabled={end ? true : false}
                                        onPress={() =>
                                            this.setCorrect()}>
                                        <FontAwesome style={Platform.OS == 'ios' ? styles.correctIOS : styles.correct}
                                            name={Platform.OS == 'ios' ? 'check-square' : 'check-circle'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={end ? true : false}
                                        onPress={() =>
                                            this.setFalse()}>
                                        <Entypo style={Platform.OS == 'ios' ? styles.incorrectIOS : styles.incorrect}
                                            name={Platform.OS == 'ios' ? 'squared-cross' : 'circle-with-cross'}
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
                                <View style={styles.resultButton}>
                                    <TouchableOpacity
                                        onPress={() => this.props.goBack()}
                                        disabled={end ? false : true}
                                    >
                                        <MaterialCommunityIcons
                                            style={Platform.OS == 'ios' ? styles.backIOS : styles.back}
                                            name='arrow-left-bold-circle-outline' />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.resultButton}>
                                    <TouchableOpacity onPress={() =>
                                        this.restart()}>
                                        <Ionicons style={Platform.OS == 'ios' ? styles.restartIOS : styles.restart}
                                            name='md-refresh'
                                        />
                                    </TouchableOpacity>
                                </View>
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
    correctIOS: {
        color: 'green',
        fontSize: 40,
    },
    incorrectIOS: {
        color: 'red',
        fontSize: 40,
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
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
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
        width: 200,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 10,
    },
    resultButton: {
        flexDirection: 'row',
        backgroundColor: '#996',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 60,
        elevation: 5
    },
    resultText: {
        color: '#fff',
        fontSize: 30
    },
    restart: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
    back: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
    restartIOS: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        width: 60,
        height: 30
    },
    backIOS: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        width: 60,
        height: 30
    },
});

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapDispatchToProps)(QuizScreen)
Mobile Flashcards is a react-native project to create a self testing app where users create Decks and Cards with Questions and Answers to test their own knowledge and/or memory.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## What's in it?

### Home View

1- A list of Decks to choose from. Initially empty.
2- Add new deck button to add decks to native storage.

### Add Deck View

Enter a title for the Deck and save.

### Deck View

1- Click a deck to open it in Deck Details view.
2- When Q&A cards are added, the first question will be displayed.
3- Add button to add question and answer cards.
4- Start a Quiz button to start a quiz.
5- Displays Number of questions available as well as current question index.
6- Click Flip button to see the answer, and again to return to question.
7- Click navigation arrows to check next and previous questions.

### Quiz View

1- Read the questions and try to answer them.
2- Click Answer to see the answer.
3- Click Correct or Incorrect buttons to mark your answer.
4- The next question is shown after marking the previous one.
5- The score is displayed on answering the last question.
6- Restart Quiz and Back buttons are displayed after the last question as well.

### Add Card View

1- Fields to enter a question and its answer.
2- Add button to save the card in the selected deck.

### Notification

* The App sends a daily notification at a fixed time to remind users to study.
* Today's notification will be cleared if at least one quiz is finished.

## Installation

The application can be installed using `yarn install` and `yarn start` to install and launch. 
`npm` can be used in place of `yarn`.


## Testing

Tested on Android devices.


## License and Sharing 

This project is submitted as a Udacity nanodegree project and not for copying or reuse.
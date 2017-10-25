// Combined reducer to provide two states: Decks and Current Deck
import { combineReducers } from 'redux'
import { ADD_QUESTION, GET_DECK, GET_DECKS, SET_TITLE } from '../actions'
import React from 'react'
export function decks(state = {}, action) {
    const { decks, type, question, answer, title } = action
    switch (type) {
        // case GET_DECK:
        //     return Object.assign({}, state[title])

        case GET_DECKS:
            return decks
        case SET_TITLE:
            return {
                ...state,
                [title]: { title, questions: [] }
            }



        default:
            return state
    }
}

export function deck(state = {}, action) {
    const { deck, type, question, answer, title } = action
    switch (type) {
        case GET_DECK:
            return deck
        case ADD_QUESTION:
            return Object.assign({}, state,
                        {questions: state.questions.concat({ question, answer })
                    })
        default:
            return state
    }
}
export default combineReducers({ decks, deck })
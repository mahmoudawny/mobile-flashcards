import { combineReducers } from 'redux'
import { ADD_QUESTION, GET_DECK, GET_DECKS, SET_TITLE } from '../actions'
import React from 'react'
export function decks(state = {}, action) {
    const { decks, type, deck, question, title } = action
    switch (type) {
        case GET_DECK:
            return {
                state: state[title]
            }
        case GET_DECKS:
            return decks
        case SET_TITLE:
            return {
                state: {
                    ...state,
                    [title]: {title, questions: []}
                }
            }
        case ADD_QUESTION:
            return {
                state: {
                    ...state,
                    [deck]: questions.concat(question)
                }
            }
        default:
            return state
    }
}

export default combineReducers({decks})
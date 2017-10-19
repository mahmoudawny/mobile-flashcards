import { combineReducers } from 'redux'
import { ADD_QUESTION, GET_DECK, GET_DECKS, SET_TITLE } from '../actions'
import React from 'react'
export function deck(state = null, action) {
    const { type, deck, question, title } = action
    switch (type) {
        case GET_DECK:
            return {
                state: state[deck]
            }
        case GET_DECKS:
            return state
        case SET_TITLE:
            return {
                state: {
                    ...state,
                    title
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

export default combineReducers({deck})
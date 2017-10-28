// Combined reducer to provide the states: All Decks, Current Deck and isChanged status
import React from 'react'
import { combineReducers } from 'redux'
import { ADD_QUESTION, GET_DECK, GET_DECKS, SET_TITLE } from '../actions'

// All Decks
export function decks(state = {ready: true}, action) {
    const { decks, type, question, answer, title } = action
    switch (type) {

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

// Current Deck
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

// isChanged?
export function changed(state = false, action) {
    const { type } = action
    switch (type) {
        case GET_DECKS:
            return false
        case ADD_QUESTION:
        case SET_TITLE:
            return true
        default:
            return state
    }
}

export default combineReducers({ decks, deck, changed })
import React from 'react'

export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SET_TITLE = 'SET_TITLE'
export const ADD_QUESTION = 'ADD_QUESTION'

// Get all decks action
export function receiveDecks(decks){
    return {
        type: GET_DECKS,
        decks
    }
}

// Get single deck action
export function receiveDeck({title, deck}){
    return {
        type: GET_DECK,
        title,
        deck
    }
}

// Add deck action
export function setTitle(title){
    return {
        type: SET_TITLE,
        title
    }
}

// Add card action
export function addQuestion({title, question, answer}){
    return {
        type: ADD_QUESTION,
        question,
        answer,
        title
    }
}
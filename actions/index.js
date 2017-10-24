import React from 'react'

export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SET_TITLE = 'SET_TITLE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks(decks){
    return {
        type: GET_DECKS,
        decks
    }
}

export function receiveDeck(title){
    return {
        type: GET_DECK,
        title
    }
}

export function setTitle(title){
    return {
        type: SET_TITLE,
        title
    }
}

export function addQuestion(title, question){
    return {
        type: ADD_QUESTION,
        question,
        title
    }
}
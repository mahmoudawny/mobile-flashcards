import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'

const DECKS = '@storage:decks'

export function getDecks(){
    return AsyncStorage.getItem(DECKS, (error, res) => {
        if(!error) return res
    })
}

export function getDeck(key){
    return AsyncStorage.getItem(DECKS, (error, res) => {
        if(!error) return res[key]
    })
}

export function saveDeckTitle(title){
    return AsyncStorage.setItem(DECKS,
         {title}, 
         (error) => {
        if(error) console.log("error saving title", error)
    })
}

export function addCardToDeck(key, question){
    return AsyncStorage.mergeItem(DECKS, question, (error, res) => {
        if(error) console.log("error adding card", error)
    })
}
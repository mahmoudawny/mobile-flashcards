import React from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { Permissions, Notifications } from 'expo'

const DECKS = 'mobile-flashcards:decks'
const NOTIFICATION_KEY = "mobile-flashcards:notifications"

export function getDecks() {
  return AsyncStorage.getItem(DECKS)
    .then((res) => JSON.parse(res))

}

export function getDeck(title) {
  return AsyncStorage.getItem(DECKS)
    .then((res) => {
      const data = JSON.parse(res)
      return data[title]
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS,
    JSON.stringify({ [title]: { title, questions: [] } }),
    (error) => {
      if (error) console.log("error saving title", error)
    })
}

export function addCardToDeck(title, question, answer) {
  return AsyncStorage.getItem(DECKS)
    .then((res) => {
      const datajs = JSON.parse(res)
      const data = datajs[title]
      const questions = data.questions.concat({question, answer})
      AsyncStorage.mergeItem(DECKS,
        JSON.stringify({ [title]: {title, questions } }))
    })
    
}


// export function addCardToDeck(title, question, answer) {
//   return AsyncStorage.mergeItem(DECKS,
//         JSON.stringify({ [title]: {title, questions: [{question, answer}] } }))
// }

export function deleteAll() {
  return AsyncStorage.setItem(DECKS,
    JSON.stringify({}),
    (error) => {
      if (error) console.log("error deleting", error)
    })
}


export function clearNotifications() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: "Log today's data",
    body: "don't forget to log your data today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    //.then(JSON.parse())
    .then((data) => {
      if (data === null) Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()
            let nextDate = new Date(Date.now())
            nextDate.setHours(nextDate.getHours()) //TODO set hour to be a fixed hour
            nextDate.setMinutes(nextDate.getMinutes() + 1)
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: nextDate,
              repeat: "day"
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    })
}
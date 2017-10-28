// helper methods to manage data storage and notifications
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

export function clearNextNotification() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => {
      AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((data) => {
          if (data === null) Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === "granted") {
                Notifications.cancelAllScheduledNotificationsAsync()
                let nextDate = new Date(Date.now())
                // set notification to tomorrow
                nextDate.setDate(nextDate.getDate() + 1)
                nextDate.setHours(18)
                nextDate.setMinutes(0)
                Notifications.scheduleLocalNotificationAsync(createNotification(), {
                  time: nextDate,
                  repeat: "day"
                })
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        })
    })
}

function createNotification() {
  return {
    title: "Today's Quiz",
    body: "Did you test yourself today?!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: false
    }
  }
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()
            let nextDate = new Date(Date.now())
            // If the hour is past 6pm schedule the notification for next day 
            if(nextDate.getHours() >= 18 ) nextDate.setDate(nextDate.getDate() + 1)
            nextDate.setHours(18) 
            nextDate.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: nextDate,
              repeat: "day"
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    })
}
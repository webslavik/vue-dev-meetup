import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  getters: {
    user (state) {
      return state.user
    },
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.data > meetupB.data
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setLoadMeetups (state, meetups) {
      state.loadedMeetups = meetups
    },
    createMeetup (state, meetup) {
      state.loadedMeetups.push(meetup)
    },
    updateMeetup (state, meetupData) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === meetupData.id
      })

      if (meetupData.title) {
        meetup.title = meetupData.title
      }
      if (meetupData.description) {
        meetup.description = meetupData.description
      }
      if (meetupData.date) {
        meetup.date = meetupData.date
      }
    },

    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    autoSignIn ({ commit }, user) {
      commit('setUser', {id: user.uid, registeredMeetups: []})
    },
    signIn ({commit}, userData) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          commit('setLoading', false)

          const authUser = {
            id: user.uid,
            registeredMeetups: []
          }

          commit('setUser', authUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUp ({ commit }, userData) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          commit('setLoading', false)

          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }

          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push({name: 'Home'})
    },

    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()

          for (let key in obj) {
            meetups.push({
              id: key,
              date: obj[key].date,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,
              title: obj[key].title,
              creatorId: obj[key].creatorId
            })
          }

          commit('setLoadMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({ commit, getters }, meetupData) {
      const meetup = {
        title: meetupData.title,
        location: meetupData.location,
        description: meetupData.description,
        date: meetupData.date.toISOString(),
        creatorId: getters.user.id
      }

      let imageUrl
      let key

      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = meetupData.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(meetupData.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetupData ({ commit }, meetupData) {
      commit('setLoading', true)
      const meetupObj = {}

      if (meetupData.title) {
        meetupObj.title = meetupData.title
      }
      if (meetupData.description) {
        meetupObj.description = meetupData.description
      }
      if (meetupData.date) {
        meetupObj.date = meetupData.date.toISOString()
        meetupData.date = meetupData.date.toISOString()
      }

      firebase.database().ref('meetups').child(meetupData.id).update(meetupObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', meetupData)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', true)
        })
    }
  }
})

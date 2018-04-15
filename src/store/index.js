import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://www.100resilientcities.org/wp-content/uploads/2017/06/Boston-hero-crop.jpg',
        id: 'sdfds1',
        title: 'Meetup in Boston',
        date: '2018-04-23',
        location: 'Boston',
        description: 'Some PHP meetup in Boston'
      },
      {
        imageUrl: 'https://9227-presscdn-0-11-pagely.netdna-ssl.com/wp-content/uploads/2016/10/30393079282_9baa011f08_b.jpg',
        id: 'ghssddf2',
        title: 'Meetup in Philadelphia',
        date: '2018-03-27',
        location: 'Philadelphia',
        description: 'Some description'
      }
    ],
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
    createMeetup (state, meetup) {
      state.loadedMeetups.push(meetup)
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
    signUp ({commit}, userData) {
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

    createMeetup ({ commit }, meetupData) {
      const meetup = {
        title: meetupData.title,
        location: meetupData.location,
        imageUrl: meetupData.imageUrl,
        description: meetupData.description,
        date: meetupData.date,
        id: 'tesdsfdsfds'
      }

      // firebase request
      commit('createMeetup', meetup)
    }
  }
})

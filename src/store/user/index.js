import * as firebase from 'firebase'
import router from '../../router'

export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    registerUserForMeetup (state, meetupData) {
      const meetup = state.user.registeredMeetups.findIndex(meetup => meetup.id === meetupData.id)

      if (meetup >= 0) {
        return
      }

      state.user.registeredMeetups.push(meetupData.id)
      state.user.firebaseKeys[meetupData.id] = meetupData.firebaseKeys
    },
    unregisterUserForMeetup (state, meetupId) {
      const registeredMeetups = state.user.registeredMeetups
      const meetupIndex = registeredMeetups.findIndex(meetup => meetup.meetupId === meetupId)

      if (meetupIndex) {
        registeredMeetups.splice(meetupIndex, 1)
        Reflect.deleteProperty(state.user.firebaseKeys, meetupId)
      }
    }
  },
  actions: {
    autoSignIn ({ commit }, user) {
      commit('setUser', {
        id: user.uid,
        registeredMeetups: [],
        firebaseKeys: {}
      })
    },
    fetchUserData ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user

      firebase
        .database()
        .ref(`users/${user.id}/registrations`)
        .once('value')
        .then(data => {
          const meetups = data.val()
          const registeredMeetups = []
          const firebaseKeys = {}

          for (let key in meetups) {
            registeredMeetups.push(meetups[key])
            firebaseKeys[key] = meetups[key]
          }

          const updatedUser = {
            id: user.id,
            registeredMeetups,
            firebaseKeys
          }

          commit('setUser', updatedUser)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signIn ({commit}, userData) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          commit('setLoading', false)

          const authUser = {
            id: user.uid,
            registeredMeetups: [],
            firebaseKeys: {}
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(user => {
          commit('setLoading', false)

          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            firebaseKeys: {}
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
    registerUserForMeetup ({ commit, getters }, meetupId) {
      commit('setLoading', true)
      const user = getters.user

      firebase
        .database()
        .ref(`/users/${user.id}`)
        .child('/registrations/')
        .push(meetupId)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {
            id: meetupId,
            firebaseKeys: data.key
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserForMeetup ({ commit, getters }, meetupId) {
      commit('setLoading', true)
      const user = getters.user

      if (!user.firebaseKeys) {
        return
      }

      const firebaseKeys = user.firebaseKeys[meetupId]
      firebase
        .database()
        .ref(`/users/${user.id}/registrations/`)
        .child(firebaseKeys)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserForMeetup', meetupId)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  }
}

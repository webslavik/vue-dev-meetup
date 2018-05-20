import * as firebase from 'firebase'
import router from '../../router'

const state = {
  user: null
}

const getters = {
  user (state) {
    return state.user
  }
}

const mutations = {
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
}

const actions = {
  autoSignIn ({ commit }, user) {
    commit('setUser', {
      id: user.uid,
      registeredMeetups: [],
      firebaseKeys: {}
    })
  },
  logout ({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push({name: 'Home'})
  },
  async fetchUserData ({ commit, getters }) {
    commit('setLoading', true)
    const user = getters.user

    try {
      const data = await firebase.database().ref(`users/${user.id}/registrations`).once('value')
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
    } catch (error) {
      console.log(error)
      commit('setLoading', false)
    }
  },
  async signIn ({commit}, userData) {
    commit('setLoading', true)
    commit('clearError')

    try {
      const user = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)

      const authUser = {
        id: user.uid,
        registeredMeetups: [],
        firebaseKeys: {}
      }

      commit('setUser', authUser)
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
    }
  },
  async signUp ({ commit }, userData) {
    commit('setLoading', true)
    commit('clearError')

    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)

      const newUser = {
        id: user.uid,
        registeredMeetups: [],
        firebaseKeys: {}
      }

      commit('setUser', newUser)
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
    }
  },
  async registerUserForMeetup ({ commit, getters }, meetupId) {
    commit('setLoading', true)
    const user = getters.user

    try {
      const data = await firebase.database().ref(`/users/${user.id}`).child('/registrations/').push(meetupId)

      commit('registerUserForMeetup', {
        id: meetupId,
        firebaseKeys: data.key
      })
      commit('setLoading', false)
    } catch (error) {
      console.log(error)
      commit('setLoading', false)
    }
  },
  async unregisterUserForMeetup ({ commit, getters }, meetupId) {
    commit('setLoading', true)
    const user = getters.user

    if (!user.firebaseKeys) {
      return
    }

    const firebaseKeys = user.firebaseKeys[meetupId]

    try {
      await firebase
              .database()
              .ref(`/users/${user.id}/registrations/`)
              .child(firebaseKeys)
              .remove()
              
      commit('setLoading', false)
      commit('unregisterUserForMeetup', meetupId)
    } catch (error) {
      console.log(error)
      commit('setLoading', false)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

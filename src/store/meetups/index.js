import * as firebase from 'firebase'

const state = {
  loadedMeetups: []
}

const getters = {
  loadedMeetups (state) {
    return state.loadedMeetups.sort((meetupA, meetupB) => {
      return meetupA.data > meetupB.data
    })
  },
  loadedMeetup (state) {
    return (meetupId) => {
      return state.loadedMeetups.find((meetup) => {
        return meetup.id === meetupId
      })
    }
  },
  featuredMeetups (state, getters) {
    return getters.loadedMeetups.slice(0, 5)
  }
}

const mutations = {
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
  }
}

const actions = {
  async loadMeetups ({ commit }) {
    commit('setLoading', true)

    try {
      const meetups = []
      const data = await firebase.database().ref('meetups').once('value')
      const dirtyMeetups = data.val()

      for (let key in dirtyMeetups) {
        meetups.push({
          id: key,
          ...dirtyMeetups[key]
        })
      }

      commit('setLoadMeetups', meetups)
      commit('setLoading', false)
    } catch (error) {
      console.log(error)
      commit('setLoading', false)
    }
  },
  async createMeetup ({ commit, getters }, meetupData) {
    const meetup = {
      title: meetupData.title,
      location: meetupData.location,
      description: meetupData.description,
      date: meetupData.date.toISOString(),
      creatorId: getters.user.id
    }

    try {
      const data = await firebase.database().ref('meetups').push(meetup)
      const key = data.key

      const filename = meetupData.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      const fileData = await firebase.storage().ref('meetups/' + key + ext).put(meetupData.image)

      const imageUrl = fileData.metadata.downloadURLs[0]
      await firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})

      commit('createMeetup', {
        id: key,
        imageUrl,
        ...meetup
      })
    } catch (error) {
      console.log(error)
    }
  },
  async updateMeetupData ({ commit }, meetupData) {
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

    try {
      await firebase.database().ref('meetups').child(meetupData.id).update(meetupObj)
      commit('setLoading', false)
      commit('updateMeetup', meetupData)
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

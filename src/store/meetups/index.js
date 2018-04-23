import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  getters: {
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
  },
  mutations: {
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
  },
  actions: {
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
      console.log(meetupData.date)
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

      firebase
        .database()
        .ref('meetups')
        .child(meetupData.id)
        .update(meetupObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', meetupData)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  }
}

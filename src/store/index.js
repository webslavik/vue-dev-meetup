import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://www.100resilientcities.org/wp-content/uploads/2017/06/Boston-hero-crop.jpg',
        id: 'sdfds1',
        title: 'Meetup in Boston',
        date: '2018-04-23'
      },
      {
        imageUrl: 'https://9227-presscdn-0-11-pagely.netdna-ssl.com/wp-content/uploads/2016/10/30393079282_9baa011f08_b.jpg',
        id: 'ghssddf2',
        title: 'Meetup in Philadelphia',
        date: '2018-03-27'
      }
    ],
    user: {
      id: 'lfld2',
      registeredMeetups: ['sdfds1']
    }
  },
  getters: {
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
    }
  },
  mutations: {},
  actions: {}
})
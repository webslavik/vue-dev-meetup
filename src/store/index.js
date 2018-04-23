import Vue from 'vue'
import Vuex from 'vuex'

import meetups from './meetups'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetups,
    user,
    shared
  }
})

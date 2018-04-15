import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'

import DateFilter from './filters/date'
import { store } from './store'

import 'vuetify/dist/vuetify.min.css'

Vue.filter('date', DateFilter)

Vue.use(Vuetify, { theme: {
  primary: '#F44336',
  secondary: '#2196F3',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDSLHXr0FzjNkK3S8eEHwsdAndLDn6d_NY',
      authDomain: 'dev-meetup-a3a7b.firebaseapp.com',
      databaseURL: 'https://dev-meetup-a3a7b.firebaseio.com',
      projectId: 'dev-meetup-a3a7b',
      storageBucket: 'dev-meetup-a3a7b.appspot.com'
    })
  }
})

<template>
  <v-app>
    <!-- Navigation drawer -->
    <v-navigation-drawer v-model='sideNav' absolute temporary>
      <v-list>
        <v-list-tile 
          href="javascript:;" 
          v-for='item in menuItems' 
          :key='item.title'
          :to='item.link'>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar class='primary white--text'>
      <v-toolbar-side-icon class='hidden-sm-and-up white--text' @click='sideNav = !sideNav' />
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>DevMeetup</router-link>
        </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class='hidden-xs-only' v-for='item in menuItems' :key='item.title'>
        <v-btn flat class='white--text' :to='item.link'>
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Router view -->
    <router-view />
    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]

      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }

      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<template>
  <v-app>
    <!-- Navigation drawer -->
    <v-navigation-drawer v-model='sideNav' absolute temporary>
      <v-list>
        <v-list-tile href="javascript:;">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>View Meetups</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar class='red white--text'>
      <v-toolbar-side-icon class='hidden-sm-and-up white--text' @click='sideNav = !sideNav' />
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class='hidden-xs-only'>
        <v-btn flat class='white--text'>
          <v-icon left>supervisor_account</v-icon>
          View meetups
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>

<template>
  <v-container>

    <!-- Preloader -->
    <v-layout v-if='loading' row>
      <v-flex style='display: flex; height: 500px;' sm12 justify-center align-center>
        <v-progress-circular 
          indeterminate 
          :size="50" 
          color="primary"
          ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-else row wrap>
      <v-flex sm12 xl8 offset-xl2>
        <v-card>
          <v-card-title>
            <h2>{{ meetup.title }}</h2>
            <template v-if='userIsCreator'>
              <v-spacer />
              <edit-meetup-dialog :meetup='meetup' />
              <edit-meetup-date-dialog :meetup='meetup' />
              <edit-meetup-time-dialog :meetup='meetup' />
            </template>
          </v-card-title>
          <v-card-media
            :src='meetup.imageUrl'
            height='400px' />
          <v-card-text>
            <div>{{ meetup.date | date }} - {{ meetup.location }}</div>
            <p>{{ meetup.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn class='secondary'>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import EditMeetupDialog from './Edit/EditMeetupDialog'
  import EditMeetupDateDialog from './Edit/EditMeetupDateDialog'
  import EditMeetupTimeDialog from './Edit/EditMeetupTimeDialog'

  export default {
    name: 'Meetup',
    components: {
      EditMeetupDialog,
      EditMeetupDateDialog,
      EditMeetupTimeDialog
    },
    props: {
      id: {
        type: [String, Number]
      }
    },
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>




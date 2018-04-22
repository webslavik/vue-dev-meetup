<template>
  <v-dialog max-width='320' v-model='registrationDialog'>

    <!-- Show dialog -->
    <v-btn color='secondary' slot='activator'>
      {{ userIsRegistered }}
    </v-btn>

    <!-- Dialog -->
    <v-card>
      <v-container>
        <v-card-title class="headline">Registration</v-card-title>
        <v-card-text>
          <p>You can always change your decision later on</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class='mr-3' @click='registrationDialog = false'>Close</v-btn>
          <v-btn color='secondary' @click='comfirm'>Confirm</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'RegistrationDialog',
    props: ['meetupId'],
    data () {
      return {
        registrationDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        const state = this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        })

        return state ? 'Register' : 'Unregister'
      }
    },
    methods: {
      comfirm () {
        if (this.userIsRegistered) {
          console.log('Unreg:', this.meetupId)
          this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
        } else {
          console.log('Reg:', this.meetupId)
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
    }
  }
</script>


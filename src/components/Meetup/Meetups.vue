<template>
  <v-container grid-list-xl>
    <v-layout row wrap >
      <v-flex xs12 sm6 md4 lg3 xl2 v-for='meetup in meetups' :key='meetup.id'>
        <v-card>
          <v-card-media
            :src="meetup.imageUrl"
            height="200px" />
            <v-card-title>
              <div>
                <h2>{{ meetup.title }}</h2>
                <div>{{ meetup.date | date }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat :to='"/meetups/" + meetup.id' color='info'>See more</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Meetups',
    computed: {
      meetups () {
        return this.$store.getters['loadedMeetups']
      }
    }
  }
</script>

<style>

</style>



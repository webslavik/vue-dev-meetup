<template>
  <v-container>

    <!-- Buttons -->
    <v-layout row wrap class='mb-2'>
      <v-flex xs12 sm6 class='text-sm-right text-xs-center'>
        <v-btn large to='/meetups' class='info'>Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class='text-sm-left text-xs-center'>
        <v-btn large to='/meetup/new' class='info'>Organize Meetup</v-btn>
      </v-flex>
    </v-layout>

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

    <!-- Carousel -->
    <v-layout v-else row wrap class='mb-2'>
      <v-flex sm12 xl6 offset-xl3>
        <v-carousel>
          <v-carousel-item 
            v-for="meetup in meetups" 
            :src="meetup.imageUrl" 
            :key="meetup.id"
            style='cursor: pointer'
            @click.native='loadingMeetup(meetup.id)'>
            <div class='title'>
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!-- Title -->
    <v-layout row wrap class='mb-2'>
      <v-flex xs12 class='text-xs-center'>
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      loadingMeetup (id) {
        this.$router.push(`/meetups/${id}`)
      }
    }
  }
</script>

<style>
  .title {
    padding: 24px;
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0, .5);
    color: white;
    font-size: 2em;
  }
</style>



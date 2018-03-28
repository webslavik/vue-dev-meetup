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

    <!-- Carousel -->
    <v-layout row wrap class='mb-2'>
      <v-flex sm12>
        <v-carousel>
          <v-carousel-item 
            v-for="meetup in meetups" 
            :src="meetup.imageUrl" 
            :key="meetup.id">
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
    data() {
      return {
        meetups: [
          { imageUrl: 'http://www.100resilientcities.org/wp-content/uploads/2017/06/Boston-hero-crop.jpg', id: '1', title: 'Meetup in Boston' },
          { imageUrl: 'https://9227-presscdn-0-11-pagely.netdna-ssl.com/wp-content/uploads/2016/10/30393079282_9baa011f08_b.jpg', id: '2', title: 'Meetup in Philadelphia' },
        ]
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



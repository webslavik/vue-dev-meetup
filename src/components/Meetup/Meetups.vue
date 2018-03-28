<template>
  <v-container grid-list-xl>
    <v-layout row wrap >
      <v-flex xs12 sm6 md4 lg3 xl2>
        <v-card>
          <v-card-media
            src="http://www.100resilientcities.org/wp-content/uploads/2017/06/Boston-hero-crop.jpg"
            height="200px" />
            <v-card-title>
              <div>
                <h2>My Meetup</h2>
                <div>28th March 2018</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat to='/meetups/1' color='info'>See more</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
  }
</script>

<style>

</style>



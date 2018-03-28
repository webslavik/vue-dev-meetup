<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12 xl8 offset-xl2>
        <v-card>
          <v-card-title>
            <h2>{{ meetup.title }}</h2>
          </v-card-title>
          <v-card-media
            :src='meetup.imageUrl'
            height='400px' />
          <v-card-text>
            <div>{{ meetup.date }} - Where it takes place</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolorum magnam reprehenderit ea a molestias debitis dolor iure praesentium cumque consequatur asperiores placeat totam molestiae id deleniti, facilis aut iusto?</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class='secondary'>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Meetup',
    props: {
      id: {
        type: [String, Number]
      }
    },
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      }
    }
    // TODO: use "computed" better then use "created"? check in future!
    // created() {
    //   const id = this.$route.params.id
    //   this.meetup = this.$store.getters.loadedMeetup(id)
    // }
  }
</script>




<template>
  <v-container>

    <!-- Title -->
    <v-layout row class='mt-4 mb-5'>
      <v-flex sm12 xl4 offset-xl4>
        <h1 class='display-1'>Create a new Meetup</h1>
      </v-flex>
    </v-layout>

    <!-- Form -->
    <form @submit.prevent='createMeetup'>
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='title'
            label='Title'
            id='title'
            v-model='title'
            required />
        </v-flex>
      </v-layout>
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='location'
            label='Location'
            id='location'
            v-model='location'
            required />
        </v-flex>
      </v-layout>

      <!-- Image -->
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='image'
            label='Image URL'
            id='image'
            v-model='imageUrl'
            required />
        </v-flex>
      </v-layout>
      <v-layout row class='mb-3' v-if='imageUrl'>
        <v-flex sm12 xl4 offset-xl4>
          <img class='img' :src='imageUrl'>
        </v-flex>
      </v-layout>

      <v-layout row class='mb-4'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='description'
            label='Description'
            id='description'
            v-model='description'
            multi-line
            no-resize
            required />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex sm12 xl4 offset-xl4>
          <v-btn 
            type='submit'
            color='primary' 
            :disabled='!isValid'>
            Create meetup
          </v-btn>
        </v-flex>
      </v-layout>
    </form>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: ''
      }
    },
    computed: {
      isValid () {
        return this.title !== '' &&
               this.location !== '' &&
               this.imageUrl !== '' &&
               this.description !== ''
      }
    },
    methods: {
      createMeetup () {
        if (!this.isValid) {
          return
        }

        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: new Date()
        }

        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')

        this.title = ''
        this.location = ''
        this.imageUrl = ''
        this.description = ''
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100%;
  }
</style>

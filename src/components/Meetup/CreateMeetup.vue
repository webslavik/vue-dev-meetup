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
          <v-btn raised color='primary' @click='loadFile'>Upload Image</v-btn>
          <input type="file" style='display: none' ref='inputFile' accept='image/*' @change='pickFile'>
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

      <v-layout row class='mb-4'>
        <v-flex sm12 xl4 offset-xl4>
          <v-date-picker header-color="primary" v-model="date" />
          <div>{{ date }}</div>
        </v-flex>
      </v-layout>

      <v-layout row class='mb-4'>
        <v-flex sm12 xl4 offset-xl4>
          <v-time-picker header-color="primary"  format='24hr' v-model="time" />
          <div>{{ time }}</div>
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
        image: null,
        description: '',
        date: null,
        time: null,
        minTime: new Date()
      }
    },
    computed: {
      isValid () {
        return this.title !== '' &&
               this.location !== '' &&
               this.imageUrl !== '' &&
               this.description !== ''
      },
      setDate () {
        const date = new Date(this.date)

        if (this.time !== null) {
          const hours = this.time.split(':')[0]
          const minutes = this.time.split(':')[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        }

        return date
      }
    },
    methods: {
      createMeetup () {
        if (!this.isValid) {
          return
        }

        if (!this.image) {
          return
        }

        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.setDate
        }

        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')

        this.title = ''
        this.location = ''
        this.imageUrl = ''
        this.description = ''
      },
      loadFile () {
        this.$refs.inputFile.click()
      },
      pickFile (event) {
        const files = event.target.files
        let filename = files[0].name

        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }

        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100%;
  }
</style>

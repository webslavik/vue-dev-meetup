<template>
  <v-container>

    <!-- Title -->
    <v-layout row class='mt-4 mb-5'>
      <v-flex sm12 xl4 offset-xl4>
        <h1 class='display-1'>Sign up</h1>
      </v-flex>
    </v-layout>

    <!-- Form -->
    <form @submit.prevent="onSignup">
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            type='email'
            name='email'
            label='Email'
            id='email'
            v-model='email'
            required />
        </v-flex>
      </v-layout>
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='password'
            label='Password'
            id='password'
            v-model='password'
            required />
        </v-flex>
      </v-layout>
      <v-layout row class='mb-3'>
        <v-flex sm12 xl4 offset-xl4>
          <v-text-field
            solo
            name='confirmPassword'
            label='Confirm Password'
            id='confirmPassword'
            v-model='confirmPassword'
            :rules='[comparePassword]' />
        </v-flex>
      </v-layout>

      <!-- Button -->
      <v-layout>
        <v-flex sm12 xl4 offset-xl4>
          <v-btn 
            type='submit'
            color='primary'>
            Sign up
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
        email: null,
        password: null,
        confirmPassword: null
      }
    },
    computed: {
      comparePassword () {
        return this.password !== this.confirmPassword ? 'password do not match' : true
      }
    },
    methods: {
      onSignup () {
        // Vuex
        console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
      }
    }
  }
</script>

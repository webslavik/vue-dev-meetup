<template>
  <v-container>

    <!-- Title -->
    <v-layout row class='mt-4 mb-5'>
      <v-flex sm12 xl4 offset-xl4>
        <h1 class='display-1'>Sign in</h1>
      </v-flex>
    </v-layout>

    <!-- Form -->
    <v-layout row>
      <v-flex sm12 xl4 offset-xl4>
        <v-card>
          <v-card-text>
            <form @submit.prevent="onSignin">
              <v-layout row class='mb-3'>
                <v-flex sm12>
                  <v-text-field
                    type='email'
                    name='email'
                    label='Email'
                    id='email'
                    v-model='email'
                    required />
                </v-flex>
              </v-layout>
              <v-layout row class='mb-3'>
                <v-flex sm12>
                  <v-text-field
                    type='password'
                    name='password'
                    label='Password'
                    id='password'
                    v-model='password'
                    required />
                </v-flex>
              </v-layout>

              <!-- Button -->
              <v-layout>
                <v-flex sm12>
                  <v-btn 
                    type='submit'
                    color='primary'>
                    Sign in
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: null,
        password: null
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user () {
        if (this.user !== null & this.user !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      }
    }
  }
</script>

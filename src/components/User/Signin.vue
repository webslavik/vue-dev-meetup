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

          <!-- Alert -->
          <v-flex sm12 v-if='error'>
            <alert @dismissed='onDismissed' :text='error.message' />
          </v-flex>

          <!-- Fields -->
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
                    color='primary'
                    :loading='loading'
                    :disabled='loading'>
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
  import Alert from '../Shared/Alert'

  export default {
    data () {
      return {
        email: null,
        password: null
      }
    },
    components: {
      Alert
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
       loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
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
      },
      onDismissed () {
        this.$store.commit('clearError')
      }
    }
  }
</script>

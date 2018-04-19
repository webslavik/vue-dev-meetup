<template>
  <v-dialog max-width='360' v-model='editDialog'>

    <!-- Show dialog -->
    <v-btn flat icon color='error' slot='activator'>
      <v-icon>edit</v-icon>
    </v-btn>

    <!-- Dialog -->
    <v-card>
      <v-container>
        <v-card-title class="headline">Edit your meetup data</v-card-title>
        <div>Save: {{ save }}</div>
        <v-card-text>
          <!-- Title -->
          <v-layout row>
            <v-flex sm12 >
              <v-text-field
                name='title'
                label='Title'
                id='title'
                v-model='editTitle'
                required />
            </v-flex>
          </v-layout>

          <!-- Description -->
          <v-layout row>
            <v-flex sm12>
              <v-text-field
                name='description'
                label='Description'
                id='description'
                v-model='editDescription'
                multi-line
                no-resize
                required />
            </v-flex>
          </v-layout>

        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class='mr-3' @click='editDialog = false'>Close</v-btn>
          <v-btn color='primary' @click='saveChanges'>Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditMeetupDialog',
    props: ['meetup'],
    data () {
      return {
        editTitle: this.meetup.title,
        editDescription: this.meetup.description,
        editDialog: false
      }
    },
    computed: {
      save () {
        return this.editTitle === this.meetup.title || this.editDescription === this.meetup.description
      }
    },
    methods: {
      saveChanges () {
        if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
          return
        }

        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editTitle,
          description: this.editDescription,
          // date: ?
        })
      }
    }
  }
</script>

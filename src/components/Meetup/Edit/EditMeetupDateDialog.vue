<template>
  <v-dialog max-width='320' v-model='editDateDialog'>

    <!-- Show dialog -->
    <v-btn flat icon color='error' slot='activator'>
      <v-icon>date_range</v-icon>
    </v-btn>

    <!-- Dialog -->
    <v-date-picker header-color="primary" v-model="editableDate" style='width: 100%' actions>
      <template slot-scope='{save, cancel}'>
        <div class='mb-2'>
          <v-btn class='mr-3' @click='editDateDialog = false'>Close</v-btn>
          <v-btn color='primary' @click='saveMeetupDate'>Save</v-btn>
        </div>
      </template>
    </v-date-picker>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditMeetupDateDialog',
    props: ['meetup'],
    data () {
      return {
        editableDate: null,
        editDateDialog: false
      }
    },
    computed: {
      getDate () {
        return this.meetup.date.slice(0, 10)
      }
    },
    methods: {
      saveMeetupDate () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()

        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableDate = this.meetup.date.slice(0, 10)
    }
  }
</script>



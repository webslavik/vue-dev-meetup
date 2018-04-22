<template>
  <v-dialog max-width='320' v-model='editTimeDialog'>

    <!-- Show dialog -->
    <v-btn flat icon color='error' slot='activator'>
      <v-icon>access_time</v-icon>
    </v-btn>

    <!-- Dialog -->
    <v-time-picker header-color="primary" v-model="editableTime" style='width: 100%' actions format='24hr'>
      <template slot-scope='{save, cancel}'>
        <div class='mt-2 mb-2'>
          <v-btn class='mr-3' @click='editTimeDialog = false'>Close</v-btn>
          <v-btn color='primary' @click='saveMeetupTime'>Save</v-btn>
        </div>
      </template>
    </v-time-picker>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditMeetupTimeDialog',
    props: ['meetup'],
    data () {
      return {
        editableTime: this.getTime,
        editTimeDialog: false
      }
    },
    computed: {
      getTime () {
        const time = new Date(this.meetup.date)
        let hours = time.getHours()
        let minutes = time.getMinutes()

        if (hours < 10) {
          hours = `0${hours}`
        }
        if (minutes < 10) {
          minutes = `0${minutes}`
        }

        return `${hours}:${minutes}`
      }
    },
    methods: {
      saveMeetupTime () {
        const newDate = new Date(this.meetup.date)
        const hours = +this.editableTime.split(':')[0]
        const minutes = +this.editableTime.split(':')[1]

        newDate.setUTCHours(hours)
        newDate.setUTCMinutes(minutes)

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      const time = new Date(this.meetup.date)
      let hours = time.getHours()
      let minutes = time.getMinutes()

      if (hours < 10) {
        hours = `0${hours}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }

      this.editableTime = `${hours}:${minutes}`
    }
  }
</script>



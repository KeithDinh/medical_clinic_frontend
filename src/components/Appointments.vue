<template>
  <div class="appointments">
    <div class="table-border-round">
    <table>
      <tr>
        <th>Doctor</th>
        <th>Appt Date</th>
        <th>Booking Date</th>
        <th>Status</th>
      </tr>
      <template v-for="appt in appointments">
        <tr>
          <td>{{ appt.first_name }} {{ appt.last_name }}</td>
          <td>{{ appt.appt_start_time }}</td>
          <td>{{ appt.booking_date }}</td>
          <td>{{ appt.appt_status }}</td>
          <td v-if= "appt.appt_status === 'pending'"><button v-on:click="CancelAppt(appt.appt_id)" >Cancel Appointment</button></td>
        </tr>
      </template>
      <tr>
        <td></td>
      </tr>
    </table>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'Appointments',
  created () {
    this.loadAppointments()
  },
  computed: {
    ...mapState('appointment', {
      appointments: state => state.apptsList
    })
  },
  methods: {
    ...mapActions('appointment', [
      'loadAppointments',
      'deleteAppointment'
    ]),
    CancelAppt : function (apptId) {
      alert(apptId)
      this.deleteAppointment(apptId)
    }

  }
}


</script>
<style media="screen">
</style>

<template>
  <div class="appointments">
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
          <td v-if= "appt.appt_status === 'pending'"><input type="checkbox" v-bind:value="appt.appt_id"> <label>Check the box to cancel the apppointment</label></td>
        </tr>
      </template>
      <tr>
        <td><button v-on:click="CancelAppt()" >Cancel Appointment</button></td>
      </tr>
    </table>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'Appointments',
  data: function () {
    return {
     AppointmentID:'' 
    }
  },
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
    CancelAppt : function (e) {
      alert(AppointmentID)
      let appt_id = AppointmentID
      this.deleteAppointment(appt_id)
    } 
  
  }
}


</script>
<style media="screen">
</style>

<template>
 <div id="">
    <table class="table">
      <tr>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Office</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Was Referred</th>
        <th>Referring Doctor</th>
        <th>Booking Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Booking Method</th>
        <th>Appointment ID</th>
        <th>Delete Appointment</th>
      </tr>
      <tr v-for="appt in adminAppointments">
        <td>{{appt.patient}}</td>
        <td>{{appt.doctor}}</td>
        <td>{{appt.office}}</td>
        <td>{{appt.reason_for_visit}}</td>
        <td>{{appt.appt_status}}</td>
        <td>{{appt.was_referred}}</td>
        <td>{{appt.referring_doctor}}</td>
        <td>{{appt.booking_date}}</td>
        <td>{{appt.appt_start_time}}</td>
        <td>{{appt.estimated_end_time}}</td>
        <td>{{appt.booking_method}}</td>
        <td>{{appt.appointmentId}}</td>
        <td>
          <button class="button" v-on:click="DeleteAppt(appt.appointmentId)">Delete</button>
        </td>
      </tr>
    </table>
    <div><br></div>
 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

   name: 'AdminAppointment',
   created () {
      this.loadAdminAppointments()
   },
   computed: {
     ...mapState('admin', {
       adminAppointments: state => state.adminAppointmentsList
     })
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminAppointments',
       'deleteAppointment'
     ]),
     DeleteAppt(value) {
      this.deleteAppointment(value)
     }
   }
}
</script>
<style media="screen">

th {
  background-color: #0d75a6;
  color: white;
}

td {
  text-align: center;
  font-size: 12px;
}

tr:nth-child(even){
background-color: #f2f2f2
}



</style>

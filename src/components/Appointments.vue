<template>
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
           <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
             <div class="text-info subtitle1">{{appt.appt_start_time |frontEndTimeFormat}}</div></td>
          <td>{{ appt.booking_date | frontEndDateFormat}} <br>
             <div class="subtitle1">{{appt.booking_date |frontEndTimeFormat}}</div></td>
          <td>{{ appt.appt_status }}</td>
          <td v-if= "appt.appt_status === 'pending'"><button v-on:click="CancelAppt(appt.appt_id)" >Cancel Appointment</button></td>
        </tr>
      </template>
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Appointments',
  created() {
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
    CancelAppt: function (apptId) {
      alert(apptId)
      this.deleteAppointment(apptId)
    },
  },
  filters: {
    frontEndTimeFormat(str) {
      var dateobj = new Date(str);
      var hours = ("0" + dateobj.getUTCHours()).slice(-2)
      var minutes = ("0" + dateobj.getUTCMinutes()).slice(-2)
      return hours + ":" + minutes;
    },
    frontEndDateFormat(str) {
      var dateobj = new Date(str);
      var date = dateobj.getUTCDate();
      var month = dateobj.getUTCMonth();
      var year = dateobj.getUTCFullYear();
      return month + "/" + date + "/" + year;
    }
  }
}


</script>
<style media="screen">

</style>

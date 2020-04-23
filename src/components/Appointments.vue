<template>
  <div class="appointments">
    <div class="table-border-round">
    <table>
      <tr>
        <th>Doctor</th>
        <th>Appt Date</th>
        <th>Booking Date</th>
        <th>Status</th>
        <th></th>
      </tr>
      <template v-for="appt in appointments">
        <tr>
          <td>{{ appt.first_name }} {{ appt.last_name }}</td>
           <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
             <div class="text-info subtitle1">{{appt.appt_start_time | frontEndTimeFormat}}</div></td>
          <td>{{ appt.booking_date | frontEndDateFormat}} <br>
             <div class="subtitle1">{{appt.booking_date |frontEndTimeFormat}}</div></td>
          <td>{{ appt.appt_status }}</td>
          <td v-if= "appt.appt_status === 'pending'">
            <button class="button" v-on:click="book(appt.appt_id)" >Cancel </button>
            </td>
        </tr>
      </template>
      <tr>
        <td></td>
      </tr>
    </table>
    </div>
    <div v-if="booking === true" class="popup-confirm">
      <div class="row message">Please press confirm to cancel an appointment</div>
      <div class="row confirm"><button class="confirm" v-on:click=" CancelAppt()">Confirm</button><button class="cancel" v-on:click="cancel()">Cancel</button></div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Appointments',
   data: function () {
    return {
      booking: false,
      appt :''
    };
  },
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
      'cancelAppointment'
    ]),
    book: function (value) {
      this.booking = true
      this.appt=value
    },
    cancel: function () {
      this.booking = false
    },
    CancelAppt: function () {
      this.booking = false
      this.cancelAppointment(this.appt)
      this.appt = ''
    }
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
      var month = dateobj.getUTCMonth() + 1;
      var year = dateobj.getUTCFullYear();
      return month + "/" + date + "/" + year;
    }
  }
}


</script>
<style media="screen">

.button {
  background-color: #f91d1d;
  color: white;
  transition: 0.3s;
  opacity: 0.7;
  padding: 5px 10px;
  border-radius: 15px;

}

.button:hover {
background-color: red;
opacity: 1
}

.subtitle1 {
  color: #009EFB;
}

th {
  background-color: #0d75a6;
  color: white;
}

</style>

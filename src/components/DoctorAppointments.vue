<template>
  <div class="db-col2">
    <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
          <tab name="Today">
            TODAY
             <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
              </tr>
              <template v-for="appt in allAppointmentsList.todayAppointments">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{ frontEndDateFormat(appt.appt_start_time)}} <br>
                    <div class="text-info subtitle1">{{frontEndTimeFormat(appt.appt_start_time)}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Upcoming">
            Future
            <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
              </tr>
              <template v-for="appt in allAppointmentsList.futureAppointments">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{ frontEndDateFormat(appt.appt_start_time)}} <br>
                    <div class="text-info subtitle1">{{frontEndTimeFormat(appt.appt_start_time)}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Past Appointments">
            <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
              </tr>
              <template v-for="appt in allAppointmentsList.pastAppointments">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{ frontEndDateFormat(appt.appt_start_time)}} <br>
                    <div class="text-info subtitle1">{{frontEndTimeFormat(appt.appt_start_time)}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                </tr>
              </template>
            </table>

          </tab>
        </tabs>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import { doctorAppointmentsService,doctorService } from '../services'
import Vue from "vue"
import {Tab, Tabs} from "vue-tabs-component"
import moment from 'moment'
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)

//TODO:I would like to make a resuable code, but I could not pass the data into appt props
// Vue.component('apptTable',{
//     props: ['appt'],
//     template:`
//           <tr>
//              <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
//             <td>{{ appt.office}}</td>
//             <td>{{ frontEndDateFormat(appt.appt_start_time)}} <br>
//               <div class="text-info subtitle1">{{frontEndTimeFormat(appt.appt_start_time)}}</div></td>
//             <td>{{ appt.reason_for_visit}}</td>
//           </tr>`
// });



export default {

  name: 'DoctorAppointments',
  created () {
    this.loadDoctorAppointments()
  },
  computed: {
    ...mapState('doctor', {
      allAppointmentsList: state => state.doctorAppointmentsList
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorAppointments'
    ]),
    frontEndDateFormat: function(date) {
      return moment.utc(date).format('MM/DD/YYYY');
    },
     frontEndTimeFormat: function(date) {
      return moment.utc(date).format(' hh:mm:ss A');
    },

  }
}
</script>
<style media="screen">
td{
  padding:15px;
}

</style>

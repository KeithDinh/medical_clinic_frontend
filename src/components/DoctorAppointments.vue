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
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                      <div class="text-info subtitle1">{{appt.appt_start_time |frontEndTimeFormat}}</div></td>
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
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                    <div class="text-info subtitle1">{{appt.appt_start_time |frontEndTimeFormat}}</div></td>
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
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                    <div class="text-info subtitle1">{{appt.appt_start_time | frontEndTimeFormat}}</div></td>
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
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)

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
  }
}
</script>
<style media="screen">
td{
  padding:15px;
}

</style>

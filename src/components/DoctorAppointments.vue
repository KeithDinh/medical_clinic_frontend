<template>
  <div class="db-col2">
    <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
          <tab name="Today" class="table-border-round">
            TODAY
             <table >
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
                  <td><div style="position:relative;text-align: right"><button class="button-info round" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Upcoming" class="table-border-round">
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
                  <td><div style="position:relative;text-align: right"><button class="button-info round" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Past Appointments" class="table-border-round">
            <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
              </tr>
              <template v-for="appt in allAppointmentsList.pastAppointments[0]">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                    <div class="text-info subtitle1">{{appt.appt_start_time | frontEndTimeFormat}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                  <td><div style="position:relative;text-align: right"><button class="button-info round" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                </tr>
              </template>
            </table>

          </tab>
        </tabs>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import Vue from "vue"
import {Tab, Tabs} from "vue-tabs-component"
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)

export default {

  name: 'DoctorAppointments',
  created () {
    allAppointmentsList:[],
    this.loadDoctorAppointments()
  },
  computed: {
    ...mapState('doctor', {
      allAppointmentsList: state => state.doctorAppointmentsList
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorAppointments',
       'editPatient'
    ]),
        ...mapActions('profile', [
      'reloadPatient'
    ]),
    patient(value) {
      const res = this.reloadPatient(value)
    }
  },
  filters: {
    frontEndTimeFormat(str) {
      var dateobj=new Date(str);
      var hours = ("0"+ dateobj.getUTCHours()).slice(-2)
      var minutes = ("0"+ dateobj.getUTCMinutes()).slice(-2)
      console.log(hours + ":" + minutes);
      return hours + ":" + minutes;
    },
    frontEndDateFormat(str) {
      var dateobj=new Date(str);
      var date = dateobj.getUTCDate();
      var month=dateobj.getUTCMonth();
      var year= dateobj.getUTCFullYear();
      return month+"/"+date+"/"+year;
    }
  }
}
</script>
<style media="screen">
td{
  padding:15px;
}

</style>

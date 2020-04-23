<template>
  <div>
    <tabs class="tabs" :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
          <tab name="Today" class="table-border-round" >
             <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
                <th></th>
                <th></th>
              </tr>
              <template v-for="appt in allAppointmentsList.todayAppointments">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                      <div class="text-info subtitle1">{{appt.appt_start_time |frontEndTimeFormat}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                  <td><div style="position:relative;text-align: right; margin-right: 0px"><button class="button-info round btn-small" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                  <td v-if="appt.appt_status==='pending'"><div style="position:relative;text-align: left"><button class="button-warning round btn-small" style="font-size: 12px" v-on:click="start(appt.appt_id,appt.patient_id)" >Start </button></div></td>
                  <td v-if="appt.appt_status==='started'"><div style="position:relative;text-align: left"><button class="button-warning round btn-small" style="font-size: 12px" v-on:click="finish(appt.appt_id)" >Finish</button></div></td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Upcoming" class="table-border-round">
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
                  <td><div style="position:relative;text-align: right"><button class="button-info round btn-small" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                </tr>
              </template>
            </table>
          </tab>
          <tab name="Past" class="table-border-round">
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
                  <td><div style="position:relative;text-align: right"><button class="button-info round btn-small" style="font-size: 12px" v-on:click="patient(appt.patient_id)" >View</button></div></td>
                </tr>
              </template>
            </table>
          </tab>

          <tab name="Todo List" class="table-border-round">
            <table>
              <tr>
                <th>Patient Name</th>
                <th>Office Name</th>
                <th>Doctor</th>
                <th>Date and Time</th>
                <th>Reason for Visit</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
              <template v-for="appt in allAppointmentsList.approveAppointments">
                <tr>
                   <td style="text-align: left">{{ appt.patient}}<br><div class="subtitle1">MRN: {{appt.patient_id}}</div></td>
                  <td>{{ appt.office}}</td>
                  <td>{{appt.doctor}}</td>
                  <td>{{ appt.appt_start_time | frontEndDateFormat}} <br>
                    <div class="text-info subtitle1">{{appt.appt_start_time | frontEndTimeFormat}}</div></td>
                  <td>{{ appt.reason_for_visit}}</td>
                  <td v-if="appt.appt_status=='need approval'">
                   <div style="position:relative;text-align: center;">
                      <button class="button-info round btn-small" style="font-size: 12px" v-on:click="approve(appt.appt_id)">Approve</button></div>
                  </td>
                  <td v-if="appt.appt_status=='need approval'">
                         <div style="position:relative;text-align: center;">
                           <button class="button-warning round btn-small" style="font-size: 12px" v-on:click="reject(appt.appt_id)">Reject</button></div>
                  </td>
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
    this.loadDoctorAppointments()
  },
  data: function () {
    return {
      needApprove: true,
      appt_end_time:'',
      appt_start_time:'',
      timestamp:'',
      appt_status:'',
      is_approve:false
    }
  },
  computed: {
    ...mapState('doctor', {
      allAppointmentsList: state => state.doctorAppointmentsList
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorAppointments',
       'editPatient',
      'approveAppt',
      'updateApptStatus',
    ]),
    ...mapActions('profile', [
      'reloadPatient',
    ]),
    //   ...mapActions('appointment', [
    //   'finishAppt',
    //
    // ]),
    patient(value) {
      const res = this.reloadPatient(value)
    },
    approve(appt_id){
      this.is_approve=true;
      const {is_approve} = this;
       const {dispatch} = this.$store;
      dispatch('doctor/approveAppt', {appt_id,is_approve});
    },
    reject(appt_id){
      this.is_approve=false;
      const {is_approve} = this;
       const {dispatch} = this.$store;
      dispatch('doctor/approveAppt', {appt_id,is_approve});
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.appt_end_time=dateTime;
      this.timestamp=dateTime;
      return dateTime
    },
    finish(appt_id){
      this.getTimestamp();
      this.appt_status='finished'
      const {timestamp,appt_status} = this;
      const {dispatch} = this.$store
      dispatch('doctor/updateApptStatus', {appt_id, timestamp,appt_status})
    },
    start(appt_id,patient_id){
      this.getTimestamp();
      this.appt_status='started'
      const {timestamp,appt_status} = this;
      const {dispatch} = this.$store
      dispatch('doctor/updateApptStatus', {appt_id, timestamp,appt_status})
      this.patient(patient_id)

    },

  },
  filters: {
    frontEndTimeFormat(str) {
      var dateobj=new Date(str);
      var hours = ("0"+ dateobj.getUTCHours()).slice(-2)
      var minutes = ("0"+ dateobj.getUTCMinutes()).slice(-2)
      return hours + ":" + minutes;
    },
    frontEndDateFormat(str) {
      const dateobj = new Date(str);
      const month = ('0' + (dateobj.getMonth() + 1)).slice(-2);
      const date = ('0' + dateobj.getDate()).slice(-2);
      const year = dateobj.getFullYear();
      return month+"/"+date+"/"+year;
    }
  },
}
</script>
<style media="screen">
td{
  padding:15px;
}
/* TABS*/
.tabs-component-tabs {
  border-radius: 25px;
}
.tabs-component-tab {
  color: #999;
  font-size: 13px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
  border-radius:25px;
  border: 2px;
}
.tabs-component-tab.is-active {
  border: 2px #00c7db;
  transition-duration: 0.4s;
  background-color: #00c7db;
  color:#fff;
  /*z-index: 2;*/
  /*transform: translateY(0);*/
}
  .tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.4em 1.5em;
  text-decoration: none;
    border-radius:25px
}
  .tabs-component-panels {
  padding: 15px 0;
}


</style>

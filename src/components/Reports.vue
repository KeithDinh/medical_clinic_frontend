<template>
  <div id="reports" class="row">
    <div class="row dashboard_header">
      <h2>Reports</h2>
    </div>
    <div class="row container">
      <div class="row report-form">
        <form @submit.prevent="handleSubmit">
          <div class="row filters">
            <div class="filter left">
              <div class="row label">Report Type</div>
              <div class="row select">
                <select type="text" v-model="reportType" id="reportType" name="reportType">
                  <option v-for="type in reportTypes" v-bind:value="type">{{ type }}</option>
                </select>
              </div>
            </div>
            <div class="filter left">
              <div class="row label">Filter by patient</div>
              <div class="row select">
                <select type="text" v-model="patient" id="reportType" name="reportType">
                  <option value="all">All</option>
                  <option v-for="pat in patients" v-bind:value="pat.patientId">{{ pat.firstName }} {{ pat.middleInit }} {{ pat.lastName }} patient id: {{ pat.patientId }}</option>
                </select>
              </div>
            </div>
            <div class="filter left">
              <div class="row label">Filter by doctor</div>
              <div class="row select">
                <select type="text" v-model="doctor" id="reportType" name="reportType">
                  <option value="all">All</option>
                  <option v-for="doc in doctors" v-bind:value="doc.doctorId">{{ doc.firstName }} {{ doc.middleInit }} {{ doc.lastName }} doctor id: {{ doc.doctorId }}</option>
                </select>
              </div>
            </div>
            <div class="filter left">
              <div class="row label">Filter by office</div>
              <div class="row select">
                <select type="text" v-model="office" id="reportType" name="reportType">
                  <option value="all">All</option>
                  <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }} office id: {{ off.office_id }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row submit"><button v-on:click="GetReport()">GET REPORT</button></div>
        </form>
        <table v-if="reportType === 'Canceled Appointments'">
          <tr>
            <th>Appt ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Office</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Booking Date</th>
            <th>Booking Method</th>
            <th>Reason for Visit</th>
          </tr>
          <tr v-for="report in reports">
            <td>{{ report.appt_id }}</td>
            <td>
              <div class="row name">{{ report.first_name }} {{ report.middle_initial }} {{ report.last_name }}</div>
              <div class="row id">Patient ID: {{ report.patient_id }}</div>
            </td>
            <td>
              <div class="row name">{{ report.doc_first_name }} {{ report.doc_middle_initial }} {{ report.doc_last_name }}</div>
              <div class="row id">Doctor ID: {{ report.doctor_id }}</div>
            </td>
            <td>{{ report.office_name }}</td>
            <td>{{ report.appt_start_time }}</td>
            <td>{{ report.estimated_end_time }}</td>
            <td>{{ report.appt_status }}</td>
            <td>{{ report.booking_date }}</td>
            <td>{{ report.booking_method }}</td>
            <td>{{ report.reason_for_visit }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex'
import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {

  name: 'Reports',
  data () {
    return {
      reportType: '',
      reportTypes: [
        'Average Appointment Duration',
        'Canceled Appointments',
      ],
      patient: 'all',
      doctor: 'all',
      office: 'all'
    }
  },
  components: {
    Tabs,
    Tab
  },
  created () {
    this.loadAdminPatients()
    this.loadAdminDoctors()
    this.loadAdminOffices()
  },
  computed: {
    ...mapState('admin', {
      patients: state => state.patients,
      doctors: state => state.doctors,
      offices: state => state.offices,
      reports: state => state.reports
    })
  },
  methods: {
    ...mapActions('admin', [
      'loadAdminPatients',
      'loadAdminDoctors',
      'loadAdminOffices',
      'loadReport'
    ]),
    GetReport () {
      const { reportType, patient, doctor, office } = this
      this.loadReport({ reportType, patient, doctor, office })
    }
  }
}
</script>
<style>
.report-form {padding:80px 0;}
.report-form table {margin:40px 0 0;}
.report-form .submit {margin:30px 0 0;text-align:center;}
.report-form .submit button {color:#fff;padding:10px 30px;border:none;border-radius:50px;background:#00c7db;}
.filters {background:#888;padding:20px 10px 25px;}
.filters .filter {width:25%;padding:10px}
.filter .label {padding:0 0 5px 17px;color:#fff;}
th {
    font-size: 14px;
    color: #fff;
    background: #888;
    padding: 10px;
    text-align: left;
}

td {
    font-size: 12px;
    padding: 10px;
}
tr:nth-child(odd){background-color: #fff;}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}

</style>
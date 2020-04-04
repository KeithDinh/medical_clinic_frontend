<template>
      <div class="row">
        <h2 class='dashboard_header'>Doctor Dashboard</h2>
        <div class="db">
        <DoctorProfile class=" db-col1 panel" />
        <DoctorPatientsList class="db-col2 panel" />
        </div>
      </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { doctorAppointmentsService,doctorService } from '../services'
import Vue from "vue";
import moment from 'moment';
import Profile from "./Profile";
import DoctorProfile from "./DoctorProfile";
import DoctorPatientsList from "./DoctorPatientsList";
export default {

  name: 'DoctorPatients',
  created () {
    this.loadDoctorPatients()
  },
   components: {
     DoctorPatientsList,
    DoctorProfile,
    Profile,
  },
  computed: {
    ...mapState('doctor', {
      patientList: state => state.patients
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorPatients'
    ]),
    frontEndDateFormat: function(date) {
      return moment.utc(date).format('MM/DD/YYYY');
    },
  }
}
</script>
<style media="screen">
td{
  padding:15px;
}

</style>

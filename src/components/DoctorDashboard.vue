<template>
  <div class="row">
    <div class="row dashboard_header"><h2>Doctor Dashboard</h2></div>
    <div class="row dashboard">
      <DoctorProfile class="db-col1" />
      <DoctorAppointments class="db-col2" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

import { mapState, mapActions } from 'vuex'
import DoctorProfile from './DoctorProfile'
import DoctorAppointments from "./DoctorAppointments";
export default {
  name: 'DoctorDashboard',
  components: {
    DoctorProfile,
    DoctorAppointments,
  },
  data () {
    return {}
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style media="screen">
  .dashboard_header{ color: white; background-color: #15558d; padding: 20px;text-align: left;}



</style>

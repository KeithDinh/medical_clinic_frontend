<template>
      <div class="row">
        <h2 class='dashboard_header'>Doctor Dashboard</h2>
        <div class="db">
        <DoctorProfile class="db1" />
        <DoctorAppointments class="db2" />
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
  .db{display: flex;  margin-top: 30px;}
  .db>*{background-color: #fff;  border: 1px solid rgba(0,0,0,0.1); border-radius: 7px;}
  .db1{width: 25%; margin: 0 15px 0 30px;}
  .db2{width: 75%; margin: 0 30px 0 15px;}


</style>

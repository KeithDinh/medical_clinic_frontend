<template>
  <div class="row">
    <div class="row dashboard_header"><h2>Dashboard</h2></div>
    <div class="row dashboard">
      <Profile class="db-col1" />
      <div class="db-col2">
        <tabs class="tabs" :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
          <tab name="Appointments">
            <Appointments />
          </tab>
          <tab name="Prescriptions">
            <Prescriptions />
          </tab>
           <tab name="Records">
            <MedicalRecords />
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {Tabs, Tab} from 'vue-tabs-component';
import { mapState, mapActions } from 'vuex'
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
import Profile from './Profile'
import Appointments from './Appointments'
import Prescriptions from './Prescriptions'
import MedicalRecords from './MedicalRecords'
export default {
  name: 'Dashboard',
  components: {
    Profile,
    Appointments,
    Prescriptions,
    MedicalRecords,
    Tabs,
    Tab
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
/* patient profile and info layout */
  .dashboard_header{ color: white; background-color: #15558d; padding: 20px;text-align: left;}
  .db{display: flex;}
  .db>*{background-color: #fff;  border: 1px solid rgba(0,0,0,0.1); border-radius: 7px;}

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

  .tabs-component-panels {
  padding: 0 0 20px;
}



</style>

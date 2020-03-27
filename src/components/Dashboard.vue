<template>
      <div class="row">
        <h2 class='dashboard_header'>Dashboard</h2>
        <div class="db">
        <Profile class="db1" />  
        <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
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
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
    MedicalRecords
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
  .db{display: flex;  margin-top: 30px;}
  .db>*{background-color: #fff;  border: 1px solid rgba(0,0,0,0.1); border-radius: 7px;}
  .db1{width: 25%; margin: 0 15px 0 30px;}
  .db2{width: 75%; margin: 0 30px 0 15px;}

</style>

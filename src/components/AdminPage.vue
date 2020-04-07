 <template>
  <div id="admin">
    <div class="row">
      <h2 class='dashboard_header'>Admin Dashboard</h2>

      <div >
      <Admin class="db1" />
      <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
        <tab name="Patients">
          <AdminPatient />
        </tab>
        <tab name="Doctors">
          <AdminDoctor />
        </tab>
         <tab name="Appointments">
          <AdminAppointment />
        </tab>
         <tab name="Offices">
          <AdminOffice />
        </tab>

      </tabs>
      <!-- <Doctors> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex'
import AdminProfile from './AdminProfile'
import AdminPatient from './AdminPatient'
import AdminDoctor from './AdminDoctor'
import AdminAppointment from './AdminAppointment'
import AdminOffice from './AdminOffice'

import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {

  name: 'AdminPage',
  components: {
    AdminProfile,
    AdminPatient,
    AdminDoctor,
    AdminAppointment,
    AdminOffice,
    Tabs,
    Tab
  },
  created () {
    this.loadAdminProfile()
  },
  computed: {
   ...mapState('admin', {
     admin: state => state.adminProfile
   })
 },
 methods: {
   ...mapActions('admin', [
     'loadAdminProfile'
   ])
 }
}
</script>
<style media="screen">
.doctor-name{
  font-weight: bold;
  font-size: 20px;

}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>

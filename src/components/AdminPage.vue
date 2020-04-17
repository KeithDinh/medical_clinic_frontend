 <template>
  <div id="admin">
    <div class="row dashboard_header"><h2>Admin Dashboard</h2></div>
    <div class="row container">
      <div >
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
        <tab name="Register Doctor">
          <AdminDoctorRegister />
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
import AdminPatient from './AdminPatient'
import AdminDoctor from './AdminDoctor'
import AdminAppointment from './AdminAppointment'
import AdminOffice from './AdminOffice'
import AdminDoctorRegister from './AdminDoctorRegister'
import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {

  name: 'AdminPage',
  data () {
    return {}
  },
  components: {
    AdminPatient,
    AdminDoctor,
    AdminAppointment,
    AdminDoctorRegister,
    AdminOffice,
    Tabs,
    Tab
  },
  created () {

  },
  computed: {

 },
 methods: {

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

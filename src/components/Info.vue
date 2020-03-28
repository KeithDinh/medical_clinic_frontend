<template lang="html">
  <div class="info_container">
    
      <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
        <tab name="Appointments">
          <div class="appointments">
            <table >
              <tr>
                <th>Doctor</th>
                <th>Appt Date</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
              <tr v-for="appt in appointments">
                <td>{{ appt.first_name }}</td>
                <td>14 Nov </td>
                <td>12 Nov </td>
                <td>Pending </td>
              </tr>
              <div v-for="a in appointments">{{ a.first_name.toString() }}</div>
            </table>
          </div>
        </tab>
        <tab  name="Prescriptions">
          <div class="prescriptions">
            <table >
              <tr>
                <th>Doctor</th>
                <th>Date Prescribed</th>
                <th>Dose Form</th>
                <th>Dosage</th>
              </tr>
            </table>
          </div>
        </tab>
        <tab  name="Medical Records">
          <div class="medicalrecords">  
            <table >
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Diagnoses</th>
                <th>Treatment</th>
                <th>Lab Test Required</th>
              </tr>
            </table>
          </div>
        </tab>
      </tabs>
    </ul>
  </div>

</template>

<script>
import Vue from 'vue';
import {Tabs, Tab} from 'vue-tabs-component';
import { mapState, mapActions } from 'vuex'

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {
  name: 'Info',
  components: {
    Tabs
  },
  
  created () {
  },

  computed: {
    
    ...mapState('profile', {
        appointments: state => state.appointmentsList
    })
  },

    methods: {
    ...mapActions('profile', [
      'loadProfile'
    ]),

    createProfile (e) {
      this.submitted = true
      const {profile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/createProfile', profile)
    },
    updateProfile (e) {
      this.submitted = true
      const {profile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/updateProfile', profile)
    }
  }
}

</script>

<style lang="css" scoped>
table{
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
}

.appointments {
  border-radius: 7px;
  margin: 10px 20px;
  border:1px solid rgba(0,0,0,0.2);

}
.appointments table tr th, .appointments table tr td{
  padding:20px;
}
.appointments table tr:not(:last-child){
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

.prescriptions {
  border-radius: 7px;
  margin: 10px 20px;
  border:1px solid rgba(0,0,0,0.2);

}
.prescriptions table tr th, .appointments table tr td{
  padding:20px;
}
.prescriptions table tr:not(:last-child){
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

.medicalrecords {
  border-radius: 7px;
  margin: 10px 20px;
  border:1px solid rgba(0,0,0,0.2);

}
.medicalrecords table tr th, .appointments table tr td{
  padding:20px;
}
.medicalrecords table tr:not(:last-child){
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
/* ********************* TAB ********************* */


</style>

<template>
  <div >
    <hr class="style1">
    <div style="position:relative;text-align: right;padding-right:10px"><button class="button-info round" @click='isOpen = !isOpen'>Add New</button></div>
    <!--    TODO:Jon, please take a look at this. the value of isOpen changes when button is clicked, but the value of isOpen in the div doesn't change. My idea is showing the form here, instead of dashboard-->
    <div v-show = "isOpen"><NewPrescription/></div>
    <div class="table-border-round">
    <table>
      <tr>
        <th>Doctor</th>
        <th>Date Prescribed</th>
        <th>Medication</th>
        <th>Dose Form</th>
        <th>Dosage</th>
      </tr>
      <template v-for="rx in prescriptions">
        <tr>
          <td>{{ rx.first_name }} {{ rx.last_name }}</td>
          <td>{{ rx.date_prescribed }}</td>
           <td>{{ rx.medication_name }}</td>
          <td>{{ rx.dose_form_name }}</td>
          <td>{{ rx.dosage }}</td>
        </tr>
      </template>
    </table>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import Profile from "./Profile";
import Appointments from "./Appointments";
import MedicalRecords from "./MedicalRecords";
import NewPrescription from "./NewPrescription";
import {Tab, Tabs} from "vue-tabs-component";
export default {

  name: 'Prescriptions',
  created () {
    this.loadPrescriptions()
  },
   data:{
      isOpen: true,
  },
  components: {
    NewPrescription,
  },
  computed: {
    ...mapState('prescription', {
      prescriptions: state => state.rxList
    })
  },
  methods: {
    ...mapActions('prescription', [
      'loadPrescriptions'
    ]),
  }
}


</script>
<style media="screen">

</style>

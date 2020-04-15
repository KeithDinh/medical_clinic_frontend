<template>
  <div class="row">
    <hr class="style1">
    <div v-if="userStatus.localUser != null && userStatus.localUser.role_id !=2">
    <div style="position:relative;text-align: right;padding-right:10px"><button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button><button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button></div>
    <!--    TODO:Jon, please take a look at this. the value of isOpen changes when button is clicked, but the value of isOpen in the div doesn't change. My idea is showing the form here, instead of dashboard-->
    <div class="prescription-form" v-if="isOpen"><NewPrescription /> <hr class="style1" style="padding-bottom: 30px; margin-top:20px"></div>
    </div>
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
          <td>{{ rx.date_prescribed | frontEndDateFormat}} <br>
            <div class="subtitle1">{{rx.date_prescribed |frontEndTimeFormat}}</div>
          </td>
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
   data: function () {
    return {
      isOpen: false
    }
  },
  components: {
    NewPrescription,
  },
  computed: {
    ...mapState('prescription', {
      prescriptions: state => state.rxList
    }),
        userStatus () {
    // if you want to expose the entire sate
      return this.$store.state.authentication
    }
  },
  methods: {
    ...mapActions('prescription', [
      'loadPrescriptions'
    ]),
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    }
  },
  filters: {
    frontEndTimeFormat(str) {
      var dateobj = new Date(str);
      var hours = ("0" + dateobj.getUTCHours()).slice(-2)
      var minutes = ("0" + dateobj.getUTCMinutes()).slice(-2)
      return hours + ":" + minutes;
    },
    frontEndDateFormat(str) {
      var dateobj = new Date(str);
      var date = dateobj.getUTCDate();
      var month = dateobj.getUTCMonth();
      var year = dateobj.getUTCFullYear();
      return month + "/" + date + "/" + year;
    }
  }
}


</script>
<style media="screen">

</style>

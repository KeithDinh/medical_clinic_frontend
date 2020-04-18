<template>
  <div class="row">
    <hr class="style1">
    <div v-if="userStatus.localUser != null && userStatus.localUser.role_id ==3">
      <div style="position:relative;text-align: right;padding-right:10px">
        <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button>
        <button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button>
      </div>
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
        <th v-if="userStatus.localUser.role_id ==3">Edit</th>
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
          <td v-if="userStatus.localUser.role_id ==3">
            <button @click="popUpModal(rx)">Edit</button>
          </td>
        </tr>
      </template>
    </table>
    <div v-if="isHidden" class="modal-container">
      <PrescriptionUpdate :disableModal="disableModal" :rxObject="singleRx" class="modal" />
    </div>

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
import PrescriptionUpdate from './PrescriptionUpdate';

export default {

  name: 'Prescriptions',
  created () {
    this.loadPrescriptions()
  },
   data: function () {
    return {
      isOpen: false,
      isHidden: false,
      singleRx: {}
    }
  },
  components: {
    NewPrescription,
    PrescriptionUpdate
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
    popUpModal(obj){
      this.isHidden = true;
      this.singleRx = obj;
    },
    disableModal () {
     this.isHidden = false;
   },
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    addingPrescription (e) {
      this.submitted=true
      const {apptId, patient, medicationId, doseFormId, dosage, indication, datePrescribed} = this
      const {dispatch} = this.$store
      dispatch('prescription/addPrescription', {apptId, patient , medicationId, doseFormId, dosage, indication, datePrescribed})
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.datePrescribed = dateTime;
      return this.datePrescribed
    },
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
.modal-container{
  background-color:rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal{
  width: 500px;
  margin: 5% auto;
  background-color: white;
  padding: 20px;
}
</style>

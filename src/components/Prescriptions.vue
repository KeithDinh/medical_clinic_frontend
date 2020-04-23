<template>
  <div class="row">

    <NewPrescription />
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
    <div v-if="isVisible" class="modal-container">
      <PrescriptionUpdate :disableModal="disableModal" :rxObject="singleRx" class="modal" />
    </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapActions } from 'vuex'
import NewPrescription from "./NewPrescription";
import PrescriptionUpdate from './PrescriptionUpdate';

export default {

  name: 'Prescriptions',
  created () {
    this.loadPrescriptions()
  },
   data: function () {
    return {
      singleRx: {},
      isVisible: false,
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
      return this.$store.state.authentication
    }
  },
  methods: {
    ...mapActions('prescription', [
      'loadPrescriptions'
    ]),
    popUpModal(obj){this.isVisible = true;this.singleRx = obj;},
    disableModal () {this.isVisible = false;},
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
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
      const dateobj = new Date(str);
      const month = ('0' + (dateobj.getMonth() + 1)).slice(-2);
      const date = ('0' + dateobj.getDate()).slice(-2);
      const year = dateobj.getFullYear();
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

<template>
  <div class="medicalrecords">
    <hr class="style1">
       <div style="position:relative;text-align: right;padding-right:10px">
         <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button>
         <button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button>
       </div>
      <div v-if="isOpen"><NewRecord/></div>
    <div class="table-border-round">
      <table >
        <tr>
          <th>Doctor</th>
          <th>Date</th>
          <th>Diagnoses</th>
          <th>Treatment</th>
          <th>New Prescription</th>
          <th>Lab Test Required</th>
        </tr>
        <template v-for="record in records">
          <tr>
            <td>{{ record.first_name }} {{ record.last_name }}</td>
            <td>{{ record.actual_start_time | frontEndDateFormat}} <br>
              <div class="subtitle1">{{record.actual_start_time |frontEndTimeFormat}}</div>
            </td>
            <td style="font-size: 14px">{{ record.diagnoses }}</td>
            <td style="font-size: 14px">{{ record.treatment }}</td>
            <td>{{record.new_prescriptions | booleanFormat}}</td>
            <td>{{ record.lab_testing | booleanFormat}}</td>
          </tr>
        </template>
      </table>
      </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import NewRecord from "./NewRecord";
import NewPrescription from "./NewPrescription";

export default {

  name: 'MedicalRecords',
  components: {NewRecord, NewPrescription},
  created () {
    this.loadMedicalRecords()
  },
   data: function () {
    return {
      isOpen: false
    }
  },
  component:{
    NewRecord,
  },
  computed: {
    ...mapState('medicalRecords', {
      records: state => state.recordsList
    })
  },
  methods: {
    ...mapActions('medicalRecords', [
      'loadMedicalRecords'
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
    },
    booleanFormat(str){
      if(str=="0")
        return "No"
      else
        return "Yes"
    }
  },

}


</script>
<style media="screen">

</style>

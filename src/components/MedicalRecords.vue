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
          <th>Lab Test Required</th>
        </tr>
        <template v-for="record in records">
          <tr>
            <td>{{ record.first_name }} {{ record.last_name }}</td>
            <td>{{ record.actual_start_time }}</td>
            <td>{{ record.diagnoses }}</td>
            <td>{{ record.treatment }}</td>
            <td>{{ record.treatment }}</td>
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
  }
}


</script>
<style media="screen">
</style>

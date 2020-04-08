<template>
  <div class="medicalrecords">
    <hr class="style1">
    <div style="position:relative;text-align: right;padding-right:10px"><button class="button-info round">Add New</button></div>
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

export default {

  name: 'MedicalRecords',
  created () {
    this.loadMedicalRecords()
  },
  computed: {
    ...mapState('medicalRecords', {
      records: state => state.recordsList
    })
  },
  methods: {
    ...mapActions('medicalRecords', [
      'loadMedicalRecords'
    ])
  }
}


</script>
<style media="screen">
</style>

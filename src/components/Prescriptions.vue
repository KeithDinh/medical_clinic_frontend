<template>
  <div >
    <hr class="style1">
    <div style="position:relative;text-align: right;padding-right:10px"><button class="button-info round">Add New</button></div>
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

export default {

  name: 'Prescriptions',
  created () {
    this.loadPrescriptions()
  },
  computed: {
    ...mapState('prescription', {
      prescriptions: state => state.rxList
    })
  },
  methods: {
    ...mapActions('prescription', [
      'loadPrescriptions'
    ])
  }
}


</script>
<style media="screen">
</style>

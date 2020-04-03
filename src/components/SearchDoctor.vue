<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Select An Office Location</div>
        <form @submit.prevent="handleSubmit">
          <div id="office-form" class="row forms">
            <label> Select An Office </label>
            <select type="text" v-model="office" id="office" name="office">
              <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
            </select>
            <label> Select A Doctor </label>
            <select type="text" v-model="doctor" id="doctor" name="doctor">
              <option v-if="doctors" v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
            </select>
            <div class="row" v-if="profile.first_name">
              <div class="row">{{ profile.first_name }} {{ profile.last_name }}</div>
              <div class="row">Specialization: {{ profile.specialization_name }}</div>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchDoctor',
  components: {
  },
  data: function () {
    return {
      office: '',
      doctor: ''
    };
  },
  watch: {
    office: function (value) {
      this.loadDoctorsByOffice(value)
    },
    doctor: function (value) {
      this.loadDoctorById(value)
    }
  },
  created () {
    this.loadOffices()
  },
  computed: {
    ...mapState('offices', {
      offices: state => state.officeList
    }),
    ...mapState('doctors', {
      doctors: state => state.doctorsList
    }),
    ...mapState('doctors', {
      profile: state => state.doctorProfile
    })
  },
  methods: {
    ...mapActions('offices', [
      'loadOffices'
    ]),
    ...mapActions('doctors', [
      'loadDoctorsByOffice'
    ]),
    ...mapActions('doctors', [
      'loadDoctorById'
    ]),
  }
}
</script>

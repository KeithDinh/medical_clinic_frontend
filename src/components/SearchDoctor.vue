<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Select An Office Location</div>
        <form @submit.prevent="handleSubmit">
          <div id="office-form" class="row forms">
            <select type="text" v-model="office" id="office" name="office">
              <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
            </select>
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
    }
  },
  created () {
    this.loadOffices()
  },
  computed: {
    ...mapState('doctors', {
      doctors: state => state.doctorList
    }),
    ...mapState('offices', {
      offices: state => state.officeList
    })
  },
  methods: {
    ...mapActions('offices', [
      'loadOffices'
    ]),
    ...mapActions('doctors', [
      'loadDoctorsByOffice'
    ])
  }
}
</script>
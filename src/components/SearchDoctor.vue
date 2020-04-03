<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn" style="background:#81d4f7">
        <div class="office_header">We have diverse health professionals<br><label>     </label><div>    </div>to take care of you and your family!</div>
        <form @submit.prevent="handleSubmit">
          <div id="office-form">
            <br><br><br><br><br><br><br>
            <label> Select An Office </label>
            <br><br><br>
            <label>  </label>
            <select type="text" v-model="office" id="office" name="office" style="width: 300px">
              <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
            </select>
            <br><br><br>
            <label> Select A Doctor </label>
            <br><br><br>
            <label>  </label><select type="text" v-model="doctor" id="doctor" name="doctor" style="width: 300px">
              <option v-if="doctors" v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
            </select>
            
            <div class="doctorprofile" v-if="profile.first_name">
              <div >Name: {{ profile.first_name }} {{ profile.last_name }}</div>
              <div >Specialization: {{ profile.specialization_name }}</div>
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
<style>
label{
  float:left;
  font:bold;
}
select{
  float: left;
}

.office_header{
  padding:10px;
  float:left;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 30px;
  color:#ffffff;
  font:bold;
}
footer {

  background: #81d4f7;
  padding-bottom:180px;
}

</style>
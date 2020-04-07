<template>

<div>
  <div class="leftsideofPage" style="width: 100%; height: 100px;    float: left;">
    <div class="row">
      <div class="row form">
        <div class="row form-ctn" style="background:#0d75a6">
          <div class="office_header">We have diverse health professionals<br><label>     </label><div>    </div>to take care of you and your family!</div>
          <form @submit.prevent="handleSubmit">
            <div id="office-form">
              <br><br><br><br><br><br><br>
              <label class="selectLabels"> Select An Office </label>
              <br><br><br>
              <label>  </label>
              <select type="text" v-model="office" id="office" name="office" style="width: 300px">
              <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
              </select>
              <br><br><br>
              <label class="selectLabels"> Select A Doctor </label>
              <br><br><br>
              <label>  </label><select type="text" v-model="doctor" id="doctor" name="doctor" style="width: 300px">
              <option v-if="doctors" v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
              </select>
              <br><br><br>
            </div>
            </form>
        </div>
      </div>
    </div>
</div>
  

  <div class="rightsideofPage" style="margin-left: 75%; margin-right: 30%; height: 20px; float: right;">
    <br><br><br><br>
    <img class="doctorPic" src="https://images.generated.photos/kKm6mHstrQ7Fi5Nec03mPNtN8w-w6W_g43vI0UKrnIg/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA2/MjExNjEuanBn.jpg">
    <section class="NameSpecializationBackground" >
              <div class="doctorprofile" v-if="profile.firstName">
                <div >
                Name: {{ profile.firstName }} {{ profile.lastName }}
                </div>
                <div >Specialization: {{ profile.specializationName }}
                </div>
              </div>
    </section>
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
    ...mapState('doctor', {
      doctors: state => state.doctorsList
    }),
    ...mapState('doctor', {
      profile: state => state.doctorProfile
    })
  },
  methods: {
    ...mapActions('offices', [
      'loadOffices'
    ]),
    ...mapActions('doctor', [
      'loadDoctorsByOffice'
    ]),
    ...mapActions('doctor', [
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

.selectLabels{
  color: #ffffff;
}

.office_header {
  padding:10px;
  float:left;
  font-family:"Trebuchet MS", Helvetica, sans-serif;
  font-size: 30px;
  color:#ffffff;
  font:bold;
  background: #0d75a6;
}

.NameSpecializationBackground {
  background: black;
  width: 300px;
  margin: 0 auto;
  border-radius: 10px;
}

.doctorprofile {
  color: #ffffff;
}

.doctorPic {
  width: 200px;
  height: 200px;
  margin: 0;

}

.rightsideofPage {
padding: auto;
}

footer {
  background: #0d75a6;
  padding-bottom: 180px;
}

</style>

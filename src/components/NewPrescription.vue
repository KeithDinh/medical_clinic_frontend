<template>
  <div class="container">
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-30">
        <label >By</label>
      </div>
      <div class="col-70">
        <input type="text" id="doctor_name" name="doctorName"  v-model="doctor.firstName +' '+doctor.lastName" disabled>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label >DoctorID</label>
      </div>
      <div class="col-70">
        <input type="text" id="doctor_id" name="doctorId"  v-model="doctor.doctorId" disabled>
      </div>
    </div>


    <div class="row">
      <div class="col-30">
        <label >Medication Name</label>
      </div>
      <div class="col-70">
        <select type="text" id="medication_name" name="medication name">
          <option v-for="meds in medications.medicationNames[0]" v-bind:value="meds.medication_name" >{{meds.medication_name}}</option>
        </select>
      </div>
    </div>

      <div class="row">
      <div class="col-30">
        <label >Medication Form</label>
      </div>
      <div class="col-70">
        <select type="text" id="medication_forms" name="medication form">
          <option v-for="meds in medications.medicationForms[0]" v-bind:value="meds.dose_form_name" >{{meds.dose_form_name}}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label for="subject">Subject</label>
      </div>
      <div class="col-70">
        <textarea id="subject" name="subject" placeholder="Dosage and instruction" style="height:100px"></textarea>
      </div>
    </div>
    <div class="row">
      <input type="submit" value="Submit">
    </div>
  </form>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DoctorProfile from "./DoctorProfile";
export default {
  name: 'NewPrescription',
  data () {
    return {
      apptId :'',
      doctorId : '',
      patientId :'',
      medicationId :'',
      doseForm :'',
      dosage :'',
      datePrescribed :''
      ,
      submitted: false
    }
  },
    created() {
    this.loadDoctorMedications(),
      this.loadDoctorProfile
  },
  watch: {
    medications: function () {
      this.loadDoctorMedications(),
         this.loadDoctorProfile()
    }
  },
  computed: {
    ...mapState('doctor', {
      medications: state => state.doctorMedsList,
      doctor: state => state.doctorProfile
    }),
    ...mapState('profile',{
      patient: state => state.userProfile
    }),
    },

  methods: {
    ...mapActions('doctor', [
      'loadDoctorMedications',
      'loadDoctorProfile',
    ]),
     addNewPescription (e) {
      this.submitted = true
    }
  }
}
</script>
<style media="screen">
</style>

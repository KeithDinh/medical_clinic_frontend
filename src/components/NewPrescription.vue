<template>
  <div class="container">
  <form @submit.prevent="handleSubmit">
     <div class="row">
      <div class="col-30">
        <label >Created Time</label>
      </div>
      <div class="col-70">
        <input type="text" id="datePrescribed" name="datePrescribed"  v-model="datePrescribed" disabled>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label >Created By</label>
      </div>
      <div class="col-70">
        <input type="text" id="doctorName" name="doctorName"  v-model="doctor.firstName +' '+doctor.lastName" disabled>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label>DoctorID</label>
      </div>
      <div class="col-70">
        <input type="text" id="doctorId" name="doctorId" v-model="doctor.doctorId" disabled>
      </div>
    </div>
    <div class="row">
      <div class="col-30">
        <label >Appointment Time</label>
      </div>
      <div class="col-70">
        <select type="text" id="apptId" name="apptId" v-model="apptId">
          <option v-for="appt in appointments" v-if="appt.doctor_id===doctor.doctorId" v-bind:value="appt.appt_id">{{appt.appt_start_time}}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label >Patient MRN</label>
      </div>
      <div class="col-70" v-if="patient">
        <input type="text" id="patientId" name="patientId"  v-model="patient.patientId" disabled>
      </div>
    </div>


    <div class="row">
      <div class="col-30">
        <label >Medication Name</label>
      </div>
      <div class="col-70">
        <select type="text" id="medicationId" name="medicationName" v-model="medicationId">
          <option v-for="meds in medications.medicationNames" v-bind:value="meds.medication_id">{{meds.medication_name}}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label >Medication Form</label>
      </div>
      <div class="col-70">
        <select type="text" id="medicationForm" v-model="doseFormId" name="medicationForm">
          <option v-for="meds in medications.medicationForms" v-bind:value="meds.dose_form_id">{{meds.dose_form_name}}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label for="dosage">Dosage</label>
      </div>
      <div class="col-70">
        <textarea  maxlength="40" style="height:50px" type="text" id="dosage" name="dosage" v-model="dosage" placeholder="Dosage and instruction"></textarea>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label for="indication">Indication</label>
      </div>
      <div class="col-70">
        <textarea maxlength="40"  style="height:50px" type="text" id="indication" name="indication" v-model="indication" placeholder="Indication"></textarea>
      </div>
    </div>

    <div class="row" style="position:relative;text-align: right;padding-right:10px">
       <button class="button-info round" type="submit" v-if id="submit" v-on:click="addingPrescription()">SUBMIT</button>
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
      medicationId :'',
      doseFormId: '',
      dosage :'',
      indication: '',
      datePrescribed :'',
      submitted: false
    }
  },
    created() {
    this.loadDoctorMedications(),
      setInterval(this.getTimestamp, 1000);
  },
  watch: {
  },
  computed: {
    ...mapState('doctor', {
      medications: state => state.doctorMedsList,
      doctor: state => state.doctorProfile
    }),
    ...mapState('profile',{
      patient: state => state.userProfile
    }),
    ...mapState('appointment', {
      appointments: state => state.apptsList
    }),
    },

  methods: {
    ...mapActions('doctor', [
      'loadDoctorMedications',
      'loadDoctorProfile',
    ]),
        ...mapActions('appointment', [
      'loadAppointments',
    ]),

    //TODO: Jon, somwhow the only data from the form is the datePrescribed. From the console, the others is empty string
    addingPrescription (e) {
      this.submitted=true
      const {apptId, patient, medicationId, doseFormId, dosage, indication, datePrescribed} = this
      const {dispatch} = this.$store
      dispatch('prescription/addPrescription', {apptId, patient , medicationId, doseFormId, dosage, indication, datePrescribed})
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.datePrescribed = dateTime;
      return this.datePrescribed
    },
  }
}
</script>
<style media="screen">
</style>

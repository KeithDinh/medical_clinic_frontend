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
        <label >DoctorID</label>
      </div>
      <div class="col-70">
        <input type="text" id="doctorId" name="doctorId"  v-model="doctor.doctorId" disabled>
      </div>
    </div>

          <div class="row">
      <div class="col-30">
        <label >Appointment Time</label>
      </div>
      <div class="col-70">
        <select type="text" id="apptId" name="apptId">
          <option v-for="appt in appointments" v-if="appt.doctor_id===doctor.doctorId" v-bind:value="appt.appt_id" >{{appt.appt_start_time}}</option>
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
        <select type="text" id="medicationId" name="medicationName">
          <option v-for="meds in medications.medicationNames[0]" v-bind:value="meds.medication_name" >{{meds.medication_name}}</option>
        </select>
      </div>
    </div>

      <div class="row">
      <div class="col-30">
        <label >Medication Form</label>
      </div>
      <div class="col-70">
        <select type="text" id="medicationForm" name="medicationForm">
          <option v-for="meds in medications.medicationForms[0]" v-bind:value="meds.dose_form_name" >{{meds.dose_form_name}}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-30">
        <label for="dosage">Dosage</label>
      </div>
      <div class="col-70">
        <textarea id="dosage" name="dosage" placeholder="Dosage and instruction" style="height:100px"></textarea>
      </div>
    </div>
    <div class="row">
        <input type="submit" id="submit" v-on:click="addingPrescription()" Submit>
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
      setInterval(this.getTimestamp, 1000);
  },
  watch: {
    medications: function () {
      this.loadDoctorMedications(),
         this.loadDoctorProfile()
    },
    appointments: function () {
      this.loadAppointments()
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
     addingPrescription (e) {
      this.submitted = true
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.datePrescribed = dateTime;
      return this.datePrescribed
    },
    book (e) {
      const { doctor, office, refDoctor, date, timeslot, reason, bookingMethod } = this
      const { dispatch } = this.$store
      dispatch('appointment/setAppointment', { doctor, office, refDoctor, date, timeslot, reason, bookingMethod })
    }
  }
}
</script>
<style media="screen">
</style>

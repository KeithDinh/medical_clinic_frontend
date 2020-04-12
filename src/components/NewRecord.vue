
<template>
  <div class="container">
    <form>
      <div class="row">
          <div class="col-30">
            <label >Created By</label>
          </div>
          <div class="col-70">
            <input type="text" id="doctorName" name="doctorName"  v-model="doctor.firstName +' '+doctor.lastName" disabled/>
          </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label>DoctorID</label>
        </div>
        <div class="col-70">
          <input type="text" id="doctorId" name="doctorId" v-model="doctor.doctorId" disabled/>
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
          <label >Start Time</label>
        </div>
        <div class="col-70">
          <input type="text" id="actualStartTime" name="actualStartTime"  v-model="actualStartTime" disabled>
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
          <label >Height (f)</label>
        </div>
        <div class="col-70">
          <input maxlength="11" type="text" id="height" name="height"  v-model="height">
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label >Body Weight (lbs)</label>
        </div>
        <div class="col-70">
          <input maxlength="11" type="text" id="weight" name="weight"  v-model="weight">
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label >New Prescription</label>
        </div>
        <div class="col-70">
          <select type="text" id="newPrescriptions" name="newPrescriptions" v-model="newPrescriptions">
            <option v-bind:value="1">Yes</option>
            <option v-bind:value="0">No</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label for="diagnoses">Diagnoses</label>
        </div>
        <div class="col-70">
          <textarea  maxlength="40" style="height:50px" type="text" id="diagnoses" name="diagnoses" v-model="diagnoses" placeholder="Diagnoses"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label >Lab Test</label>
        </div>
        <div class="col-70">
          <select type="text" id="labTesting" name="labTesting" v-model="labTesting">
            <option v-bind:value="1">Yes</option>
            <option v-bind:value="0">No</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label for="treatment">Treatment</label>
        </div>
        <div class="col-70">
          <textarea maxlength="40"  style="height:50px" type="text" id="treatment" name="treatment" v-model="treatment" placeholder="Treatment"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-30">
          <label >End Time</label>
        </div>
        <div class="col-70">
          <input type="text" id="actualEndTime" name="actualEndTime"  v-model="actualEndTime" disabled/>
        </div>
      </div>

      <div class="row" style="position:relative;text-align: right;padding-right:10px">
         <button class="button-info round" type="submit" v-if id="submit" v-on:click="addingRecord()">SUBMIT</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DoctorProfile from "./DoctorProfile";
export default {
  name: 'NewRecord',
  data () {
    return {
      apptId :'',
      height :'',
      weight: '',
      diagnoses :'',
      labTesting:'',
      treatment: '',
      newPrescriptions:'',
      actualStartTime:'',
      actualEndTime :'',
      submitted: false
    }
  },
  created() {
     this.getStartTime();
     setInterval(this.getEndTime,1000)
  },
  watch: {
  },
  computed: {
    ...mapState('doctor', {
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
      'loadDoctorProfile',
    ]),
        ...mapActions('appointment', [
      'loadAppointments',
    ]),
    addingRecord (e) {
      this.submitted=true;
      this.getEndTime();
      const {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime} = this
      const {dispatch} = this.$store
      dispatch('medicalRecords/addRecord', {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime})
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      return dateTime;
    },
    getStartTime: function () {
      this.actualStartTime=this.getTimestamp();
    },
    getEndTime:function () {
      this.actualEndTime=this.getTimestamp();
    }
  }
}

</script>
<style media="screen">
</style>






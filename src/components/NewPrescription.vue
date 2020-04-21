<template>
  <div class="container">
    <div v-if="userStatus.localUser != null && userStatus.localUser.role_id == 3">
      <div style="position:relative;text-align: right;padding-right:10px">
        <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button>
        <button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button>
      </div>
      <div class="prescription-form" v-if="isOpen">
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
                <option v-for="appt in appointments" v-if="appt.doctor_id===doctor.doctorId && isTodayAppt(appt.appt_start_time) && appt.appt_status==='started'" v-bind:value="appt.appt_id">{{appt.appt_start_time}}</option>
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
              <select type="text" id="med" name="medication" v-model="med">
                <option v-for="med in medications.medicationNames" v-bind:value="med">{{med.medication_name}}</option>
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
  </div>

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
      med:'',
      doseFormId: '',
      dosage :'',
      indication: '',
      datePrescribed :'',
      todayDate:'',
      isOpen: false,
      submitted: false
    }
  },
    created() {
    this.loadDoctorMedications(),
      setInterval(this.getTimestamp, 1000);
    this.getTodayDate();
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
      userStatus () {
    // if you want to expose the entire sate
      return this.$store.state.authentication
    }

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
      let ackMsg=''
      let errors=this.validatePrescriptionForm(this.apptId,this.med.medication_id,this.doseFormId,this.dosage,this.indication);
      if(errors.length===0) {
        if(this.med.medication_sideeffects.length!=0) {
          ackMsg = "Acknowledge the side effects of this medication: " + this.med.medication_sideeffects;
        }
        else{
          ackMsg='Confirm that you want to add this prescription?'
        }
        if(confirm(ackMsg)) {
          this.submitted = true
          const {apptId, patient, med, doseFormId, dosage, indication, datePrescribed} = this
          const {dispatch} = this.$store
          dispatch('prescription/addPrescription', {
            apptId,
            patient,
            med,
            doseFormId,
            dosage,
            indication,
            datePrescribed
          })
          this.addClicked();
        }
      }
      else{
        alert("Missing Fields")
      }
    },
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
     validatePrescriptionForm (apptId, medicationId, doseFormId, dosage,indication) {
      let errors = []
      if (!apptId) {
        errors.push(new Error('ApptId required.'))
      }
      if (!medicationId) {
        errors.push(new Error('medicationId required'))
      }
      if (!doseFormId) {
        errors.push(new Error('doseForm required'))
      }
      if (!dosage) {
        errors.push(new Error('dosage required'))
      }
      if (!indication) {
        errors.push(new Error('indication required'))
      }
      return errors
    },
    getTimestamp: function () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.datePrescribed = dateTime;
      return this.datePrescribed
    },
    getDate: function (str){
      const dateobj=new Date(str);
      const month = ('0' + (dateobj.getMonth() + 1)).slice(-2);
      const date = ('0' + dateobj.getDate()).slice(-2);
      const year = dateobj.getFullYear();
      const formattedDate = year + '-' + month + '-' + date;
      return formattedDate;
    },
    getTodayDate: function () {
      const todayDate = new Date();
      const month = ('0' + (todayDate.getMonth() + 1)).slice(-2);
      const date = ('0' + todayDate.getDate()).slice(-2);
      const year = todayDate.getFullYear();
      const formattedDate = year + '-' + month + '-' + date;
      this.todayDate=formattedDate;
      return formattedDate;
    },
    isTodayAppt(str){
      const apptDate=this.getDate(str)
      if (this.todayDate==apptDate){
        return 1;
      }
      return 0;
    }

  }
}
</script>
<style media="screen">
</style>

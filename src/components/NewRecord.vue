
<template>
  <div class="container" v-if="userStatus.localUser != null && userStatus.localUser.role_id == 3 && hasStartedAppt()">
        <hr class="style1">
    <div style="position:relative;text-align: right;padding-right:10px">
        <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button>
        <button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button>
    </div>
    <div class="record-form" v-if="isOpen">
      <form @submit.prevent="handleSubmit">
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
              <option v-for="appt in appointments" v-if="appt.doctor_id===doctor.doctorId && isTodayAppt(appt.appt_start_time) && appt.appt_status==='started'" v-bind:value="appt.appt_id">{{appt.appt_start_time}}</option>
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
      todayDate:'',
      isOpen: false,
      submitted: false
    }
  },
  created() {
     this.getStartTime();
     setInterval(this.getEndTime,1000),
     this.getTodayDate()

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
    userStatus () {
    // if you want to expose the entire sate
      return this.$store.state.authentication
    }
    },

  methods: {
    ...mapActions('doctor', [
      'loadDoctorProfile',
    ]),
        ...mapActions('appointment', [
      'loadAppointments',
    ]),
    addingRecord (e) {
       let errors=this.validateRecordForm(this.apptId, this.height,this.weight,this.diagnoses,this.labTesting,this.treatment, this.newPrescriptions);
       if (errors.length==0){
         this.submitted=true;
          this.getEndTime();
          const {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime} = this
          const {dispatch} = this.$store
          dispatch('medicalRecords/addRecord', {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime});
            this.addClicked();
       }
       else{
          alert("Missing Fields")
       }

    },

    validateRecordForm(apptId, height,weight,diagnoses,labTesting,treatment, newPrescriptions){
      let errors = []
      if (!apptId) {
        errors.push(new Error('ApptId required.'))
      }
      if (!height) {
        errors.push(new Error('height required'))
      }
      if (!weight) {
        errors.push(new Error('weight required'))
      }
      if (!diagnoses) {
        errors.push(new Error('diagnoses required'))
      }
       if (labTesting!=0 && labTesting!=1) {
        errors.push(new Error('labTesting required'))
      }
      if (!treatment) {
        errors.push(new Error('treatment required'))
      }
       if (newPrescriptions!=0&&newPrescriptions!=1) {
        errors.push(new Error('newPrescriptions required'))
      }
      return errors
    },
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
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
    },
    hasStartedAppt(){
      let appt='';
      for(let i=0;i< this.appointments.length;i++){
        appt=this.appointments[i];
        if(appt.doctor_id===this.doctor.doctorId && this.isTodayAppt(appt.appt_start_time) && appt.appt_status==='started')
          return true;
      }
    }

  }
}

</script>
<style media="screen">
</style>






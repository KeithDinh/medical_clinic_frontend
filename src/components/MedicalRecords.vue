<template>
  <div class="medicalrecords">
    <hr class="style1">
     <div v-if="userStatus.localUser != null && userStatus.localUser.role_id ==3" style="position:relative;text-align: right;padding-right:10px">
       <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Add New</button>
       <button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button>
     </div>

    <div v-if="isOpen">
      <NewRecord/>
     <hr class="style1" style="padding-bottom: 30px; margin-top:20px">
    </div>

    <div class="table-border-round">
      <table >
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Diagnoses</th>
            <th>Treatment</th>
            <th>New Prescription</th>
            <th>Lab Test Required</th>
            <th v-if="userStatus.localUser.role_id==3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="record in records">
            <tr>
              <td>{{ record.first_name }} {{ record.last_name }}</td>
              <td>{{ record.actual_start_time | frontEndDateFormat}} <br>
                <div class="subtitle1">{{record.actual_start_time |frontEndTimeFormat}}</div>
              </td>
              <td style="font-size: 14px">{{ record.diagnoses }}</td>
              <td style="font-size: 14px">{{ record.treatment }}</td>
              <td>{{record.new_prescriptions | booleanFormat}}</td>
              <td>{{ record.lab_testing | booleanFormat}}</td>
              <td v-if="userStatus.localUser.role_id==3">
                <button type="button" @click="popUpModal(record)">Edit</button>
              </td>
            </tr>
          </template>
        </tbody>

        <div v-if="isHidden" class="modal-container">
          <MedicalRecordUpdate :disableModal="disableModal" :recObject="singleRx" class="modal" />
        </div>
      </table>
      </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import NewRecord from "./NewRecord";
import NewPrescription from "./NewPrescription";
import MedicalRecordUpdate from "./MedicalRecordUpdate"
export default {

  name: 'MedicalRecords',
  components: {NewRecord, NewPrescription, MedicalRecordUpdate},
  created () {
    this.loadMedicalRecords()
  },
   data: function () {
    return {
      isOpen: false,
      isHidden: false,
      singleRecord: {}
    }
  },
  computed: {
    ...mapState('medicalRecords', {
      records: state => state.recordsList
    }),
     userStatus () {return this.$store.state.authentication}
  },
  methods: {
    ...mapActions('medicalRecords', [
      'loadMedicalRecords'
    ]),
     addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    popUpModal(obj){this.isHidden = true;this.singleRx = obj;},
    disableModal(){this.isHidden = false;},
  },
  filters: {
    frontEndTimeFormat(str) {
      var dateobj = new Date(str);
      var hours = ("0" + dateobj.getUTCHours()).slice(-2)
      var minutes = ("0" + dateobj.getUTCMinutes()).slice(-2)
      return hours + ":" + minutes;
    },
    frontEndDateFormat(str) {
      var dateobj = new Date(str);
      var date = dateobj.getUTCDate();
      var month = dateobj.getUTCMonth();
      var year = dateobj.getUTCFullYear();
      return month + "/" + date + "/" + year;
    },
    booleanFormat(str){
      if(str=="0")
        return "No"
      else
        return "Yes"
    }
  },

}


</script>
<style media="screen">

.medicalrecords {
  margin: 5px;
}
.modal-container{
  background-color:rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal{
  width: 500px;
  margin: 5% auto;
  background-color: white;
  padding: 20px;
}
</style>

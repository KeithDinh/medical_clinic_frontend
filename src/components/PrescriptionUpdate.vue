<template lang="html">
  <form @submit.prevent="handleSubmit">
    <label for="first_name">Patient First Name</label><br>
    <input type="text" id="first_name" name="first_name" v-model="rxObject.first_name" readonly>
    <label for="last_name">Patient Last Name</label><br>
    <input type="text" id="last_name" name="last_name" v-model="rxObject.last_name" readonly>

    <label for="indication">Indication</label><br>
    <input type="text" name="indication" v-model="rxObject.indication">


    <label for="dosage">Dosage</label><br>
    <input type="text" name="dosage" v-model="rxObject.dosage">
    <label for="dose_form_name">Dosage Form Name</label><br>
    <select type="text" v-model="rxObject.dose_form_name" id="dose_form_name" name="dose_form_name">
      <option
        v-for="(dose_name, index) in dose_form_names"
        :key="index"
        :selected="rxObject.dose_form_name === dose_name"
        >{{ dose_name }}
      </option>
    </select>

    <label for="medication_name">Medication</label><br>
    <select type="text" v-model="rxObject.medication_name" id="medication_name" name="medication_name">
      <option
        v-for="(med_name, index) in medication_names"
        :key="index"
        :selected="rxObject.medication_name === med_name"
        >{{ med_name }}
      </option>
    </select>
    <button v-on:click="update()" @click="disableModal">Save</button>
    <button @click="disableModal">Cancel</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PrescriptionUpdate',
  data(){
    return{
      rxObject: {},
       dose_form_names: ['Tablets','Capsules','Powder','Dusting powder','Cream','Paste','Gel','Suppositories',
       'Syrup','Solution','Emulsion','Suspension','Inhaler','Aerosols','Caplets','Meltlet'],
    }
  },
  props: {
    rxObject: Object,
    disableModal: Function
  },
 created () {
   setInterval(this.getTimestamp, 1000);
 },
 computed: {
   ...mapState('prescription', {
     medication_names: state => state.medications
   }),
 },
 mounted() {
},

methods: {
  ...mapActions('prescription', [
      'updateRx','loadMedications'
    ]),

  getTimestamp: function () {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;
    this.rxObject.date_prescribed = dateTime;
    return this.rxObject.date_prescribed;
  },
  update: function() {
    const { rxObject } = this
    this.updateRx(rxObject)
    disableModal
  }
 }
}
</script>
<style media="screen">
#first_name, #last_name{ background-color: rgba(0,0,0,0.1);}
</style>

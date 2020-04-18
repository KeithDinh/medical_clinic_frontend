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
       // NEED FUNCTION IN Prescription-services for these lists, hella longgggggggggg
       medication_names: [
         'Abacavir Sulfate','Abarelix','Abatacept','Abiciximab','Abelcet','Abilify','Abraxane','Accutane','Acebutolol','Acetaminophen','Advicor',
'Agrylin','Aciphex','Acitretin','Amino Acids','Asparaginase','Asacol','Aspirin','Bacitracin','Baclofen','Bactrim','Bactroban Nasal','Balsalazide',
'Banzel','Baraclude','Baycol','Bayer','Becaplermin','Benconase','Benadryl','Benazepril','Benefix','Benetyl','Benicar','BenzaClin','Benzamycin',
'Cantil','Canasa','Capoten','Captopril','Carac','Carbamazepine','Carbatrol','Cardiolite','Carmustine','Carnitor','Ceftin','Cefuroxime','Cetuximab',
'Dacogen','Dalmane','Dapsone','Daraprim','Darvon','DDAVP','Daypro','Definity','Deferasirox','Efavirenz','Effexor','Eflornithine','Emla','Endometrin',
'Extina','Chlorpheniramine Maleate','Phenylephrine Bitartrate','Tussin DM','Cold Remedy Non-Drowsy Quick Dissolving','Efferverscent Cold Relief',
'Zinc Lozenges Cold Relief','Fluticasone Propionate Nasal Spray, USP','Theraflu','Tylenol Cold Flue Severe','Emergency-C Support Drink 500mg']
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

 },
 mounted() {
},

methods: {
  getTimestamp: function () {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;
    this.rxObject.date_prescribed = dateTime;
    return this.rxObject.date_prescribed;
  },
 ...mapActions('prescription', [
     'updateRx'
   ]),
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

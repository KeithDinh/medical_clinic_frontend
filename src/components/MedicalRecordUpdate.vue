<template lang="html">
  <form @submit.prevent="handleSubmit">
    <label for="name">Patient Name</label><br>
    <input type="text" id="name" name="name" v-model="recObject.first_name+ ' ' +recObject.last_name" readonly>

    <label for="diagnoses">Diagnoses</label><br>
    <input type="text" name="diagnoses" maxlength="120" v-model="recObject.diagnoses">

    <label for="treatment">Treatment</label><br>
    <input type="text" name="treatment" maxlength="120" v-model="recObject.treatment">

    <label for="height">Height</label><br>
    <input type="text" name="height" v-model="recObject.height">

    <label for="weight">Weight</label><br>
    <input type="text" name="weight" v-model="recObject.weight">

    <label for="lab_testing">Lab Test</label><br>
    <select type="text" ref="lab_testing" name="lab_testing">
      <option :selected="recObject.lab_testing === 1">Yes</option>
      <option :selected="recObject.lab_testing === 0">No</option>
    </select>

    <button v-on:click="update()" @click="disableModal">Save</button>
    <button @click="disableModal">Cancel</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MedicalRecordUpdate',
  data(){
    return{
      recObject: {},
      labTest: null,
    }
  },
  props: {
    recObject: Object,
    disableModal: Function
  },
  computed:{
    alert () {return this.$store.state.alert},
  },
  methods: {
    ...mapActions('medicalRecords', ['updateRecord']),
    ...mapActions('alert', ['setLoading']),
      update: function() {
      this.recObject.lab_testing = (this.$refs['lab_testing'].value == "Yes") ? 1 : 0;
      const { recObject } = this;
      this.updateRecord(recObject)
      disableModal
      this.setLoading()
    }
 }
}
</script>
<style media="screen">
#first_name, #last_name{ background-color: rgba(0,0,0,0.1);}
</style>

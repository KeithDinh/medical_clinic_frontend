<template lang="html">
  <form>
    <label for="office_name">Office Name</label><br>
    <input type="text" name="office_name" v-model="officeObject.office_name">

    <label for="office_phone">Phone</label><br>
    <input type="text" name="office_phone" v-model="officeObject.phone">

    <label for="office_street">Street</label><br>
    <input type="text" name="office_street" v-model="officeObject.street_1">

    <label for="office_city">City</label><br>
    <input type="text" name="office_city" v-model="officeObject.city">

    <label for="office_state">State</label><br>
    <input type="text" name="office_state" v-model="officeObject.state">

    <label for="office_zipcode">Zipcode</label><br>
    <input type="text" name="office_zipcode" v-model="officeObject.zipcode">
    <button v-on:click="update()">Save</button>
    <button @click="disableModal">Cancel</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AdminOfficeUpdateModal',
  data(){
    return{
      officeObject: {},
    }
  },
  props: {
    officeObject: Object,
    disableModal: Function
  },
 created () {
 },
 computed: {

 },
 mounted() {
},

  methods: {
    update: function() {
      const { officeObject } = this
      this.updateOffice(officeObject) 
    },
   ...mapActions('offices', [
       'updateOffice'
     ]),
 }
}
</script>
<style media="screen">
</style>

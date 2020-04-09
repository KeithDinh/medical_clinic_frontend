<template>
 <div id="">
    <table>
      <tr>
        <th>Office Name</th>
        <th>Phone</th>
        <th>Street Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zipcode</th>

      </tr>
      <tr v-for="office in adminOffice">
          <td><input
            type="text"
            v-model="office.office_name"
            readonly
          /></td>
          <td><input
            type="text"
            v-model="office.phone"
            readonly
          /></td>
          <td><input
            type="text"
            v-model="office.street_1"
            readonly
          /></td>
          <td><input
            type="text"
            v-model="office.city"
            readonly
          /></td>
          <td><input
            type="text"
            v-model="office.state"
            readonly
          /></td>
          <td><input
            type="text"
            v-model="office.zipcode"
            readonly
          /></td>
          <td>
            <button v-on:click="update(office.office_id)" >Edit Office</button>
          </td>
      </tr>
    </table>
 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

   name: 'AdminOffice',
   created () {
      this.loadAdminOffices()
   },
   computed: {
     ...mapState('admin', {
       adminOffice: state => state.offices
     }),
     ...mapState('office',{
      selectedOffice: state => state.officeProfile
    }) 
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminOffices'
     ]),
    ...mapActions('offices',[
      'updateOffice',
      'loadOfficeProfile'
    ]),
    update: function(value) {
      this.loadOfficeProfile(value)
      /* this.updateOffice(value) */
    }
   }
}
</script>
<style media="screen">

</style>
